import Head from "next/head";

export default function Layout({ title, description, icon }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {icon && <link rel="icon" href={icon} />}
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
