import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/cjs/Button";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import List from './list'

const cryptoRandomString = require("crypto-random-string");


const FormTwiter = ({dataUser, setDataUser,setSenator,senator,mp, setMp}) => {
    const [yourMP, setYourMP] = useState([])
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(false)
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
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
        if (firstName.trim() === '' || lastName.trim() === '' ||
            zipCode.trim() === '' || email.trim() === '') {
            setError(true)
            return
        }
        setError(false)
        const randomId = cryptoRandomString({type: 'distinguishable', length: 10})
        dataUser.id = randomId;
        console.log(dataUser)
        const response = await axios.post(`http://localhost:8080/sendtwit`, {dataUser})
        const dataPayload = await response.data.data
        const getMp = await response.data.getMp
        setSenator(dataPayload)
        setMp(getMp
        )
        if (yourMP) {
            //mostrar lista de MP´s
            console.log(yourMP)
        } else {
            //Mostar Error
            console.log('Error')
        }
    }


    return (
        <div className={'container'} style={{justifyContent: 'center', display: 'flex'}}>
            <div style={{maxWidth: '700px', width: '100%'}}>
                <h1>Tweet Your MP</h1>
                {error ? <Alert variant={'danger'}>
                    All fields are required!
                </Alert> : null}
                <Form noValidate validated={validated}>

                    <Form.Group controlId="firstname">
                        <Form.Control
                            type="text"
                            placeholder="Name"
                            name="firstName"
                            onChange={handleChange}
                            required
                            autoFocus={true}
                        />
                    </Form.Group>
                    <Form.Group controlId="lastName">
                        <Form.Control
                            type="text"
                            placeholder="LastName"
                            name="lastName"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="cp">
                        <Form.Control
                            type="text"
                            placeholder="Code Postal"
                            name="zipCode"
                            onChange={handleChange}
                            required
                            maxLength="4"
                        />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Button
                            size={'lg'}
                            onClick={click}
                            className={'u-full-width'}
                        >
                            Save
                        </Button>
                    </Form.Group>
                </Form>
                <div>
                    <h2>MP´s</h2>
                    {mp.length > 0 && mp.filter(item => item.govt_type === 'Federal MPs').map((mps, index) => (
                        <List


                            mps={mps}
                            key={index}

                        />)
                    )}
                </div>
                <div>
                    <h2>Senators</h2>
                    {senator.filter(item => item.govt_type === 'Federal Senators').map((mps, index) => (
                            <div>
                                <List
                                    mps={mps}
                                    key={index}
                                />
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}
export default FormTwiter;



