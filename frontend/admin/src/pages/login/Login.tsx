import {login} from "../../api/auth-api.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const floatFocus = (args: React.FocusEvent<HTMLInputElement>): void => {
    args.currentTarget.parentElement?.classList.add("e-input-focus");
  };

  const floatBlur = (args: React.FocusEvent<HTMLInputElement>): void => {
    args.currentTarget.parentElement?.classList.remove('e-input-focus');
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      toast.error('Login failed');
      console.error('Login failed:', error);
    }
  }

  return (
    <div className="mt-50 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="e-input-group scale-110 origin-top-left">
          <input className="e-input" type="text" value={email} onChange={(e) => setEmail(e.target.value)} onFocus={floatFocus} onBlur={floatBlur} placeholder="Enter Email" />
        </div>

        <div className="e-input-group scale-110 origin-top-left mt-2">
          <input className="e-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} onFocus={floatFocus} onBlur={floatBlur}  placeholder="Password" />
        </div>

        <button
          type="submit"
          style={{ backgroundColor: 'blue', color: 'white', borderRadius: '10px' }}
          className={ `w-full mt-2 text-sm p-1 hover:drop-shadow-xl scale-110 origin-top-left` }>
          Login
        </button>

      </form>
    </div>
  );
}

export default Login;