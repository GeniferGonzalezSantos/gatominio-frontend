// "use client";

// import { useSession, signIn, signOut } from "next-auth/react"
// import Image from "next/image";
// import "./unloggedArea.css";
// import { SessionProvider } from "next-auth/react";

// export default function UnloggedArea() {
//   const { data: session } = useSession()
//   if (session) {
//     return (
//       <SessionProvider>
//         Signed in as {session.user.email} <br />
//         <button onClick={() => signOut()}>Sign out</button>
//       </SessionProvider>
//     )
//   }


//   return (
//     <div
//       className="container container-lg d-flex align-items-center flex-column justify-content-center
//     position-absolute top-50 start-50 translate-middle"
//     >
//       <Image
//         src="/perfil.png"
//         className="img-perfil rounded-circle mt-5"
//         width={150}
//         height={150}
//         alt="Picture of the author"
//       />
//       <h6 className="display-6 m-2">Título título</h6>
//       <p className="text-center m-2">
//         Center aligned text on all viewport sizes.
//       </p>
//       <div className="vstack gap-2 col-md-5 mx-auto m-5">
//         <button type="button" className="first-btn btn btn-secondary">
//           Cadastro
//         </button>
//         <button
//           type="button"
//           className="second-btn btn btn-secondary"
//           onClick={() => signIn()}
//         >
//           Login
//         </button >
//       </div>
//     </div>
//   );
// }
