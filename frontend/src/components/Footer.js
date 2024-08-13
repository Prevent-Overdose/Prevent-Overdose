import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
        <div className="footer-left">
            <span>Prevent Overdose Inc. 501(c)(3)</span>
        </div>
        <div className="footer-right">
            <a href="https://www.linkedin.com/company/prevent-overdose" target="_blank " className="fa fa-linkedin">
            </a>
            <a href="https://github.com/Prevent-Overdose/Prevent-Overdose" target="_blank" className="fa fa-github">
            </a>
            <a href="https://www.instagram.com/prevent.overdose/" target="_blank" className="fa fa-instagram">
            </a>
        </div>
    </footer>
    );
}

export default Footer;