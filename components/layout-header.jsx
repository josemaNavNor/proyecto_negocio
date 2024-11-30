import Head from "next/head";

export default function Layout({ title, description, icon }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {icon && <link rel="icon" href={icon} />}
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&family=Josefin+Sans:wght@400;700&family=Cantarell:wght@400;700&family=Quicksand:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet"></link>
      </Head>
    </div>
  );
}

// Valores por defecto si no se proporcionan props
Layout.defaultProps = {
  title: "Next.js",
  description: "Mi sitio web",
  icon: "/favicon.ico", // O la ruta donde esté tu ícono en la carpeta public
};
