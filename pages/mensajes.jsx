export default function mensajes({data}) {
    return (
      <div>
           <h1>mensajes</h1> 
           <p>Cantidad de mensajes: {data.length}</p>  
           <h3>Primer post: {data[0].title} </h3>     
           <h2>Todos los post</h2> 
           {
           data.map(
            ({title,body})=> (<div><h3>{title}</h3><p>{body}</p></div>

            )
           )
           }
          </div>
    )
  }
  
  export async function getStaticProps(params) {
      try {
          const res = await fetch("https://jsonplaceholder.typicode.com/posts");
          const data = await res.json();
          return {
              props: {data,  },
          }
      } catch (error) {
          console.error(error);
    }
  }