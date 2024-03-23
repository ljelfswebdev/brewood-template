import Link from "next/link";

const Header = () => {
    return ( 
        <header className="header">
            <div className="container">
            <ul>
                <li>
                    <Link href="/" className="header__link">
                        Team Sheet
                    </Link>
                </li>
                <li>
                    <Link href="/fifer" className="header__link">
                        Fifer
                    </Link>
                </li>
                <li>
                    <Link href="/hundred" className="header__link">
                        Hundred
                    </Link>
                </li>
                <li>
                    <Link href="/result" className="header__link">
                        Result
                    </Link>
                </li>
                <li>
                    <Link href="/week-view" className="header__link">
                        Week View
                    </Link>
                </li>
            </ul>
            </div>
        </header>
     );
}
 
export default Header;