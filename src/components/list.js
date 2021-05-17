import React from 'react'
import Button from "react-bootstrap/cjs/Button";

const List = ({mps}) => {

    const tweetText = `.${mps.twitter}%2C+I%E2%80%99m+a+voter+in+your+electorate%2C+and+I+think+our+taxes+are+too+high%21+Australians+deserve+to+keep+more+of+their+own+money+and+I%E2%80%99m+asking+you+to+fight+in+Canberra+for+lower+taxes.+%0D%0A%0D%0ASent+from+%40AusTaxpayers%E2%80%99+Contact+Your+Politician+Platform.&original_referer=https://www.taxpayers.org.au/let-them-know-you-care`
    console.log(mps)
    return (
        <div className={'container'} style={{backgroundColor:'white',marginBottom:'10px'}}>
            <div>
                <h3>{mps.name}</h3>
                <p>For: {mps.address}, City: {mps.city}, -State: {mps.state}</p>

            <div style={{display:"flex", justifyContent:'flex-end', paddingBottom:'10px'}} >
                {mps.twitter ?
                    <Button
                        variant={'dark'}
                        href={`https://twitter.com/intent/tweet?text=${tweetText}`}
                        target={"blank"}
                    >
                        SENDTWEET
                    </Button> :
                    <p>No Tiene Tweeter</p>
                }
            </div>
            </div>
        </div>
    )
}

export default List;


