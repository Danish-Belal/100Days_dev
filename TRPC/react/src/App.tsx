import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { trpc } from './utils/trpc';

export default function App() {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      }
    }
  }));
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000',

          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              authorization: "Bearer "+ localStorage.getItem('token') || '',
            };
          },
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {/* Your app here */}
        <IndexPage />
      </QueryClientProvider>
    </trpc.Provider>
  );
}



export  function IndexPage() {
  const userQuery = trpc.user.me.useQuery();
  const todoMutation = trpc.todo.createTodo.useMutation();
  const todoQuery = trpc.todo.todoGet.useQuery();
  console.log(userQuery);
  
  if(userQuery.isLoading){
    return (
      <div>
        Loading...
      </div>
    );
  }
  if(userQuery.isError){
    return <Signup />
  }

  return (
    <div>
      <p>Hi {userQuery.data?.username}</p>
      {todoQuery.data?.map(x => <div>{x.title} - {x.description}</div>)}
      <button disabled={todoMutation.isPending} onClick={() => todoMutation.mutate({ title: 'React', description: "Hit request from react" })}>
        Create Todo
      </button>
    </div>
  );
}

export function Signup(){
  const userSignupMutate = trpc.user.signup.useMutation({
    onSuccess: (data) =>{
      let token = data.token;
      localStorage.setItem("token", token)
      window.location.href = "/"
    }
  });
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  return( <div>
    Signup page
    Username
    <input type="text" onChange={(e) => setUsername(e.target.value)}></input>
    password
    <input type="text" onChange={(e) => setPassword(e.target.value)}></input>
    <button onClick={async () => {
      userSignupMutate.mutate({
        username,
        password
      })
    }}>Sign up</button>
  </div>
  )
  
}

