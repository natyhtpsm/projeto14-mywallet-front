import { Link } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import dotenv from 'dotenv';

dotenv.config();
const url = process.env.DATABASE_URL + '/cadastro';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkpassword, setcheckpassword] = useState('');
  const [name, setName] = useState('');
  
  function sendData() {
    const data = {
      email: email,
      name: name,
      password: password, 
      checkpassword: checkpassword
    };
    if (password === checkpassword){
      axios
      .post(url, data)
      .then(response => {
        const statusCode = response.status;
        if (statusCode === 422) {
          alert('O email deve ter formato válido e a senha deverá conter no mínimo 3 dígitos');
        }
        if (statusCode === 409){
          alert('Esse email já foi cadastrado');
        }
        navigate('/');
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(error.message);
        }
      });
    }
    
  }
  return (
    <SingUpContainer>
      <form>
        <MyWalletLogo />
        <input placeholder="Nome" type="text" onChange={(e) => setName(e.target.value)}/>
        <input placeholder="E-mail" type="email" onChange={(e) => setEmail(e.target.value)}/>
        <input placeholder="Senha" type="password" autocomplete="new-password" onChange={(e) => setPassword(e.target.value)}/>
        <input placeholder="Confirme a senha" type="password" autocomplete="new-password" onChange={(e) => setcheckpassword(e.target.value)} />
        <button onClick={sendData}>Cadastrar</button>
      </form>
      <Link>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
