import React,{useState} from 'react'
import FormTwiter from "./components/formtwiter";

function App() {
  const [dataUser, setDataUser] = useState({
    firstName: '',
    lastName: '',
    zipCode: '',
    email: ''
  })
  const [mp, setMp] = useState([])
  const [senator, setSenator] = useState([])
  return(
      <FormTwiter
          dataUser={dataUser}
          setDataUser={setDataUser}
          mp={mp}
          setMp={setMp}
          senator={senator}
          setSenator={setSenator}
      />
  )

}

export default App;
