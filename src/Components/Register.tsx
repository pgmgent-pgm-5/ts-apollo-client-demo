import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_ACCOUNT, PUBLISH_ACCOUNT } from '../graphql/accounts';
import { CreateAccountData, PublishAccountData, AccountIdVars } from '../interfaces';

export function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createAccount, { data }] = useMutation<CreateAccountData>(CREATE_ACCOUNT);
  const [publishAccount] = useMutation<PublishAccountData, AccountIdVars> (PUBLISH_ACCOUNT);

  useEffect(() => {
    if(data) {
      publishAccount({ variables: { id: data.createAccount.id }});
    }
  }, [publishAccount, data]);

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          createAccount({ variables: { email: email, password: password } });
        }}
      >
        <div className="form-control">
          <span>E-mail</span>
          <input
            onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="form-control">
          <span>Password</span>
          <input
            onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register;