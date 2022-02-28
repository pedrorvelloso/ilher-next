import { Section } from '~/components/section'
import { H2, Paragraph } from '~/components/typograph'
import { SocialLinkCard } from '~/components/social-link-card'

import { socials } from '~/utils/socials'
import { ConvertKitInputForm } from './convert-kit/input-form'

export const Footer = () => {
  return (
    <>
      <hr className="block h-[1px] border-top border-gray-300 dark:border-gray-700 mt-24" />
      <Section
        className="text-gray-800 dark:text-gray-400 mt-24 pb-12"
        as="footer"
      >
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          <div className="lg:max-w-sm">
            <H2 colorScheme="primary">Pedro Reis</H2>
            <Paragraph className="mb-0">
              Full stack developer creating fast and cool experiences.
            </Paragraph>
            <div className="flex gap-3 flex-wrap">
              {socials.map((social) => (
                <SocialLinkCard
                  key={social.title}
                  href={social.href}
                  icon={social.icon}
                  title={social.title}
                  social={social.social}
                  asFootnote
                />
              ))}
            </div>
          </div>
          <div className="lg:max-w-sm">
            <H2 colorScheme="primary">Sign up to the newsletter</H2>
            <Paragraph>
              Get notified when I post something new or have something cool to
              say!
            </Paragraph>
            <ConvertKitInputForm formId="3034146" />
          </div>
        </div>
        <div className="flex justify-center lg:justify-between items-end mt-24">
          <p className="text-sm lg:text-base text-gray-500">
            All rights reserved © Pedro R. Santos {new Date().getFullYear()}
          </p>
          <div className="text-black dark:text-white hidden lg:block">
            Built with
            <img
              src="/imgs/remix-dark.svg"
              className="hidden dark:block h-6"
              alt="Remix Logo"
            />
            <img
              src="/imgs/remix-light.svg"
              className="dark:hidden block h-6"
              alt="Remix Logo"
            />
          </div>
        </div>
      </Section>
    </>
  )
}
