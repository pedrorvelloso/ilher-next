import { collectedNotes } from 'collected-notes'

import { formatDate } from '~/utils/dates'
import { getEnv } from '~/utils/misc'

export const cn = collectedNotes(getEnv('CN_EMAIL'), getEnv('CN_TOKEN'))

export const sitePath = getEnv('CN_SITE_PATH')

export const getLatestNotes = async () => {
  const notes = await cn.latestNotes(sitePath, 1, 'public')

  return notes.map((note) => ({
    title: note.title,
    headline: note.headline.split('\n')[0],
    createdAt: formatDate(note.created_at),
    id: note.id,
    path: note.path,
  }))
}

export const getNote = async (path: string) => {
  const note = await cn.body(sitePath, path)

  if (Object.keys(note).length === 0) return null

  const { body, note: n } = note

  const splittedBody = body.split('\n').filter((b) => !!b)
  splittedBody[1] = `<span class="text-sm text-gray-700 dark:text-gray-400">${formatDate(
    n.created_at,
  )}</span>`

  return { body: splittedBody.join('\n') }
}
