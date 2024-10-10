import Head from "next/head"


export default function Layout({ title, description}) {
  return (
    <div>
        <Head>
            <title>{title}</title>
            <meta name="description" content={description}/>
        </Head>
    </div>
  )
};

//Especificaciones por default
Layout.defaulProps = {
    title: "Next.js",
    description: "Mi sitio web",
};
