import Link from 'next/link'
import Image from 'next/image'
import icon from '@/app/icon.png'
import './header.css'

export function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <Image src={icon} alt="Icon" width={38} height={38} />
          <span>Survival Nexus</span>
        </div>
        <nav className="header-nav">
          <Link href="/report">Report</Link>
          <Link href="/list-survivors">Survivors</Link>
          <Link href="/list-inventories">Inventory</Link>
        </nav>
        <div className="header-profile">
          <Image
            src="https://github.com/diogofonteles.png"
            alt="Profile"
            width={32}
            height={32}
          />
        </div>
      </div>
    </header>
  )
}
