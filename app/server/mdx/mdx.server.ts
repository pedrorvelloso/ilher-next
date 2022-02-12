import { bundleMDX } from 'mdx-bundler'
import { buildUrl } from 'cloudinary-build-url'
import readingTime from 'reading-time'

import { Post } from '~/types'

import { cn, sitePath } from '../collectedNotes/index.server'

import { rehypeMetaAttrs } from './rehypePlugins.server'

export const compileMdx = async (content: string) => {
  const { code, frontmatter } = await bundleMDX({
    source: content,
    xdmOptions(options) {
      // eslint-disable-next-line no-param-reassign
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeMetaAttrs,
      ]

      return options
    },
  })

  const readTime = readingTime(content).text

  return { code, frontmatter, readTime }
}

export const getNote = async (content: string) => {
  const { code, frontmatter, readTime } = await compileMdx(content)
  frontmatter.blurImage = await getBlurDataUrl(frontmatter.bannerId)

  return { code, frontmatter: { ...frontmatter, readTime } }
}

export const getLatestNotes = async () => {
  const notes = await cn.latestNotes(sitePath, 1, 'public')

  const loadedNotes = await Promise.all(
    notes.map(async (p) => {
      const { frontmatter, readTime } = await compileMdx(p.body)
      frontmatter.blurImage = await getBlurDataUrl(frontmatter.bannerId)

      const post = frontmatter as Post

      return {
        ...post,
        url: `/${p.path}`,
        readTime,
      }
    }),
  )

  return loadedNotes
}

const getDataUrlForImage = async (imageUrl: string) => {
  const res = await fetch(imageUrl)
  const arrayBuffer = await res.arrayBuffer()
  const base64 = Buffer.from(arrayBuffer).toString('base64')
  const mime = res.headers.get('Content-Type') ?? 'image/webp'
  const dataUrl = `data:${mime};base64,${base64}`
  return dataUrl
}

const getBlurDataUrl = async (cloudinaryId: string) => {
  const imageURL = buildUrl(cloudinaryId, {
    cloud: {
      cloudName: 'ilher-dev',
    },
    transformations: {
      resize: { width: 100 },
      quality: 'auto',
      format: 'webp',
      effect: {
        name: 'blur',
        value: '1000',
      },
    },
  })

  let dataUrl: string

  try {
    dataUrl = await getDataUrlForImage(imageURL)
    return dataUrl
  } catch (e) {
    console.error('error getting blur image', e)
  }
}
