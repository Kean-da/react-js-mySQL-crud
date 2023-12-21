import './_footer.scss';
import { Link } from 'react-router-dom';
import { footerMenu } from '../../../data/footerData';
import { FaFacebookF, FaInstagram, FaSquareTwitter, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <div >
        <div className='container bg-black'>
            <div className='footer-top'>
            {
                footerMenu?.map((item) => {
                    const {id, title, menu} = item;
                    return (
                        <div key={id}>
                            <p className='title-footer title'>{title}</p>
                            <ul className='list-footer'>
                                {
                                    menu?.map((itemMenu) => {
                                        const {id, link, path} = itemMenu;
                                        return(
                                            <li key={id} className='link'>
                                                <Link to={path}>{link}</Link>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                    );
                })
            }
            </div>
            <div className='footer-bottom'>
                <div>
                    <p className='footer-copyright'>2023 | XBeat. All Rights Reserved. Built by |</p>
                </div>
                <div>
                    <ul className='footer-social'>
                        <li className='hover'><FaFacebookF /></li>
                        <li className='hover'><FaInstagram /></li>
                        <li className='hover'><FaSquareTwitter /></li>
                        <li className='hover'><FaLinkedin /></li>
                    </ul>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Footer