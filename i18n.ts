import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }) => ({
  locale: locale ?? 'uz',
  messages: (await import(`./public/locales/${locale ?? 'uz'}/common.json`)).default,
}))
