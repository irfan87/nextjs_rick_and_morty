import { GetServerSideProps } from "next";
import Image from "next/image";

import Layout from "../../components/Layout";
import imageLoader from "../../imageLoader";
import { Character } from "../../types";

import styles from "../../styles/Character.module.css";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const resp = await fetch(
		`http://rickandmortyapi.com/api/character/${context.query.id}`
	);
	const character = await resp.json();

	return {
		props: {
			character,
		},
	};
};

const CharacterPage = ({ character }: { character: Character }) => {
	// const router = useRouter();

	return (
		<div className={styles.container}>
			<h1>This is {character.name}</h1>
			<Image
				className={styles.img}
				loader={imageLoader}
				unoptimized
				src={character.image}
				alt={character.name}
				width={200}
				height={200}
			/>
			<div className={styles.species}>
				<p>{character.species}</p>
			</div>
		</div>
	);
};

CharacterPage.getLayout = function getLayout(page: typeof CharacterPage) {
	// @ts-ignore
	return <Layout>{page}</Layout>;
};

export default CharacterPage;
