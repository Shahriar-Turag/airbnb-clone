'use client';
import React, { FC, useCallback, useState } from 'react';
import { SafeListing, SafeReservation, SafeUser } from '../types';
import Container from '../components/Container';
import Heading from '../components/Heading';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ListingCard from '../components/listings/ListingCard';

interface PropertiesClientProps {
	listings: SafeListing[];
	currentUser: SafeUser | null;
}

const PropertiesClient: FC<PropertiesClientProps> = ({
	listings,
	currentUser,
}) => {
	const router = useRouter();
	const [deletingId, setDeletingId] = useState('');

	const onCancel = useCallback(
		(id: string) => {
			setDeletingId(id);

			axios
				.delete(`/api/listings/${id}`)
				.then(() => {
					toast.success('Property deleted');
					router.refresh();
				})
				.catch((err) => {
					toast.error(err?.response?.data?.err);
				})
				.finally(() => {
					setDeletingId('');
				});
		},
		[router]
	);
	return (
		<Container>
			<Heading title='Properties' subtitle='List of your property' />
			<div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
				{listings.map((listing) => (
					<ListingCard
						key={listing.id}
						data={listing}
						actionId={listing.id}
						onAction={onCancel}
						disabled={deletingId === listing.id}
						actionLabel='Delete property'
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	);
};

export default PropertiesClient;
