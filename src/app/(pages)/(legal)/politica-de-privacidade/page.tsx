import { getLegalPageMetadata } from '@/app/helpers/legal-pages'

import { LegalPage } from '../_components/legal-page'

const slug = 'politica-de-privacidade'

export const metadata = getLegalPageMetadata(slug)

const PrivacyPolicyPage = () => <LegalPage slug={slug} />

export default PrivacyPolicyPage
