import React, {useState} from 'react';
import Loader from "react-loader-spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/cjs/Button";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import List from './list'
import logo from '../assets/tymp.png'
const cryptoRandomString = require("crypto-random-string");



const FormTwiter = ({dataUser, setDataUser, setSenator, senator, mp, setMp}) => {
    const [showLoadSpin, setShowLoadSpin] = useState(false)
    const [showList,setShowList] = useState(true )
    // const [yourMP, setYourMP] = useState([])
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(false)
   // const [tweetText, setTweetText] = useState({})
    const handleChange = e => {
              setDataUser({
            ...dataUser,
            [e.target.name]: e.target.value
        })
        console.log(e.target.value)
        console.log(dataUser)
    }
    const {firstName, lastName, zipCode, email, id} = dataUser;

    const click = async e => {
        e.preventDefault();
         setShowLoadSpin(true)
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
        if (//firstName.trim() === '' || lastName.trim() === '' || //
            zipCode.trim() === '' || email.trim() === '') {
            setError(true)
            return
        }
       setError(false)
        const randomId = cryptoRandomString({type: 'distinguishable', length: 10})
        dataUser.id = randomId;
        const response = await axios.post(`https://sendemail-service.herokuapp.com/sendtwit`, {dataUser})
        const dataPayload = await response.data.data
        const getMp = await response.data.getMp
        setSenator(dataPayload)
        setMp(getMp)
        await setShowLoadSpin(false)
        setShowList(false)
    //     // const dataTweet = await axios.get('http://localhost:8080/taxPayers/tweet/1')
    //     // setTweetText(dataTweet.data.data.text)
    //     if (yourMP) {
    //         //mostrar lista de MP´s
    //         console.log(yourMP)
    //     } else {
    //         //Mostar Error
    //         console.log('Error')
    //     }
    }
    return (
            <div className={'container'} style={{padding:'0px', justifyContent: 'center', display: 'flex'}}>
                <div style={{maxWidth: '800px', width: '100%', backgroundColor:'#f4f4f4'}}>
                    <div className={'container'} style={{textAlign:'center'}}>
                        {/*debe de ser img esperando  logo*/}
                        <img  style={{width:'310px', paddingTop:'25px'}}  src={logo} alt={'logo'}/>
                        {/*<h1 style={{textAlign:'center', padding:'55px'}} >Tweet Your MP</h1>*/}
                        <p  style={{textAlign:'justify'}}>By typing in a postcode, users can easily find their local MPs and Senators.
                            From there,
                            they can choose to tweet, call, or email them with just a few clicks
                            The system is created
                            to work seamlessly on both computers and smartphones, and is a great way to activate your
                            followers and subscribers into political action.

                        </p>
                        <p  style={{textAlign:'justify'}}>
                            This tool is currently built to contact Australian politicians, but can be adapted for any
                            country and its general functions can easily be repurposed.
                        </p>

                    {error ? <Alert variant={'danger'}>
                        All fields are required!
                    </Alert> : null}
                    <Form noValidate validated={validated}>
                        {/*<Form.Group controlId="firstname">*/}
                        {/*    <Form.Control*/}
                        {/*        type="text"*/}
                        {/*        placeholder="Name"*/}
                        {/*        name="firstName"*/}
                        {/*        onChange={handleChange}*/}
                        {/*        required*/}
                        {/*        autoFocus={true}*/}
                        {/*    />*/}
                        {/*</Form.Group>*/}
                        {/*<Form.Group controlId="lastName">*/}
                        {/*    <Form.Control*/}
                        {/*        type="text"*/}
                        {/*        placeholder="LastName"*/}
                        {/*        name="lastName"*/}
                        {/*        onChange={handleChange}*/}
                        {/*        required*/}
                        {/*    />*/}
                        {/*</Form.Group>*/}
                        <h3>Find you local MP here:</h3>
                        <Form.Group controlId="email">
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="cp">
                            <Form.Control
                                type="text"
                                placeholder="Type your zipCode and press ENTER"
                                name="zipCode"
                                onChange={handleChange}
                                required
                                maxLength="4"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Button
                                variant={'dark'}
                                size={'lg'}
                                onClick={click}
                                className={'u-full-width'}
                            >
                                Find your MP
                            </Button>
                        </Form.Group>
                    </Form>
                           <Loader
                            visible={showLoadSpin}
                            type="Puff"
                            color="#000000"
                            height={100}
                            width={100}
                            timeout={3000} //3 secs
                        />
                    <div style={{textAlign:'justify'}} className={'container'} hidden={showList}>
                        <div>
                            <p>NOTE: Choose only one Representative at a time.
                                If you wish to contact more than one representative, or add further emails to the same
                                Representative, you will have the option to repeat after sending each email.</p>
                        </div>
                        <h2>MP´s</h2>
                        <div>
                        {mp.length > 0 && mp.filter(item => item.govt_type === 'Federal MPs').map((mps, index) => (
                            <List
                                // tweetText={tweetText}
                                mps={mps}
                                key={index}
                            />)
                        )}
                        </div>
                    </div>
                    <div  style={{textAlign:'justify'}}  className={'container'} hidden={showList} >
                        <h2>Senators</h2>
                        {senator.filter(item => item.govt_type === 'Federal Senators').map((mps, index) => (
                                <div>
                                    <List
                                        // tweetText={tweetText}
                                        mps={mps}
                                        key={index}
                                    />
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FormTwiter;



