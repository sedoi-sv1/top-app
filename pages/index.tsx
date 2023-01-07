import { GetStaticProps } from 'next/types';
import { useEffect, useState } from "react";
import { Button, Htag, P, Tag, Rating } from "../components";
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';

function Home({ menu }: HomeProps): JSX.Element {

	const [counter, setCounter] = useState<number>(0);
	const [rating, setRating] = useState<number>(1);

	useEffect(() => {
		console.log('Counter ' + counter);
		return function cleanup() {
			console.log('Unmount ');
		};
	});

	useEffect(() => {
		console.log('Mounted');
	}, []);

	return (
		<>

			<Htag tag='h1'>Заголовок!</Htag>
			<Htag tag='h3'>{counter}</Htag>
			<Button appearance="primary" className="qwerty" arrow="down">Кнопка</Button>
			<Button appearance="ghost" arrow="right" onClick={() => setCounter(x => x + 1)}>Кнопка</Button>
			<P size='l'>Большой</P>
			<P>Средний</P>
			<P size='s'>Малый малый текст</P>

			<Tag size='s'>Ghost</Tag>
			<Tag size='m' color="red">Red</Tag>
			<Tag size='s' color="green">Green</Tag>
			<Tag color="primary" href='www.123.ru'>Primary</Tag>

			<Rating rating={rating} isEditable setRating={setRating} />

			<ul>
				{menu.map(m => (<li key={m._id.secondCategory}>{m._id.secondCategory}</li>))}
			</ul>

		</>
	);
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {

	const firstCategory = 0;

	const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', { firstCategory });

	return {
		props: {
			menu,
			firstCategory
		}
	};
};

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[],
	firstCategory: number;
}