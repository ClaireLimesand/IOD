
import './HomeItem.css';

function HomeItem({messageItem}) {
    return(
        <div>
            <div className="home-messages">
                <h3 className="home-title">{messageItem.title}</h3>
                <p className="home-message">{messageItem.message}</p>
            </div>
        </div>
    )
};

export default HomeItem;