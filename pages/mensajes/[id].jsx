
import React from 'react'
import Link from 'next/link';

export default function Mensaje({ data }) {
    return (
        <div>
            <h2>Mensaje: {data.id}</h2>
            <Link href={`https://jsonplaceholder.typicode.com/posts/${data.id}`}>
                <h3>
                    <h3>Title: {data.title}</h3>
                </h3>
            </Link>
            <p>Cuerpo de mensaje: {data.body}</p>
        </div>
    )
}

export async function getStaticPaths() {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json();

        const paths = data.map(
            ({ id }) => (
                {
                    params: { id: `${id}` }
                }
            )
        );

        return {
            paths,
            fallback: false,
        }

    } catch (error) {
        console.error(error);
    }
}

export async function getStaticProps({ params }) {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts/" + params.id)
        const data = await res.json();
        return {
            props: {
                data,
            }
        }
    } catch (error) {
        console.error(error);
    }
}

