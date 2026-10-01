import { getLegalPageMetadata } from '@/app/helpers/legal-pages'

import { LegalPage } from '../_components/legal-page'

const slug = 'termos-de-uso'

export const metadata = getLegalPageMetadata(slug)

const TermsOfUsePage = () => <LegalPage slug={slug} />

export default TermsOfUsePage
