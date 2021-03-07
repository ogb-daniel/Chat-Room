import closeIcon from '../../icons/closeIcon.png'
import onlineIcon from '../../icons/onlineIcon.png'
import './InfoBar.css';
const InfoBar = ({room}) => {
    return ( 
        <div className="infoBar">
        <div className="leftInnerContainer">
          <img className="onlineIcon" src={onlineIcon} alt="online icon" />
          <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
          <a href="/"><img className="bounce" src={closeIcon} alt="close icon" /></a>
        </div>
      </div>
     );
}
 
export default InfoBar;