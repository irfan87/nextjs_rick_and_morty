import Image from "next/image";
import Link from "next/link";
import imageLoader from "../../imageLoader";
import { Character, GetCharacterResults } from "../../types";

export const getStaticPaths = async () => {
	const resp = await fetch("http://rickandmortyapi.com/api/character");
	const { results }: GetCharacterResults = await resp.json();

	const paths = results.map((character) => {
		return {
			params: {
				id: String(character.id),
			},
		};
	});

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps = async ({
	params,
}: {
	params: { id: string };
}) => {
	const resp = await fetch(
		`http://rickandmortyapi.com/api/character/${params.id}`
	);
	const character = await resp.json();

	return {
		props: {
			character,
		},
	};
};

const CharacterPage = ({ character }: { character: Character }) => {
	// console.log(character);
	return (
		<>
			<Link href={"/"}>Home</Link>
			<h1>{character.name}</h1>
			<Image
				loader={imageLoader}
				unoptimized
				src={character.image}
				alt={character.name}
				width={200}
				height={200}
			/>
			<div>
				<p>{character.species}</p>
			</div>
		</>
	);
};

export default CharacterPage;
