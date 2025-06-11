import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AffiliateProgram from './AffiliateProgram'

/**
 * Affiliate component that serves as a wrapper for the AffiliateProgram component.
 * This component exists to maintain compatibility with the lazy-loaded import in App.tsx.
 */
const Affiliate = () => {
  return <AffiliateProgram />
}

export default Affiliate
