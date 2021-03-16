import React from 'react'
import Button from "react-bootstrap/cjs/Button";

const List = ({mps}) => {
    console.log(mps)
    const tweetText = `I+am+a+voter+in+${mps.twitter}+district%2C+and+I+strongly+oppose+the+proposed+%23CashBan!+The+ban+is+a+slow-squeeze+on+Aussies+and+is+nothing+more+than+a+gift+to+big+banks+at+our+expense.+%23DontBanCash!&original_referer=https://www.taxpayers.org.au/dont-ban-cash`
    return (
        <div>
            <h3>{mps.name}</h3>
            <p>For: {mps.address}, City: {mps.city}, -State: {mps.state}</p>
            {mps.twitter ?
                <Button
                    href={`https://twitter.com/intent/tweet?text=${tweetText}`}
                    target={"blank"}
                >
                    SENDTWEET
                </Button> :
                <p>No Tiene Tweeter</p>
            }
        </div>
    )
}

export default List;


