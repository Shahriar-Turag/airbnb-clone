'use client';

import { Range } from 'react-date-range';

interface ListingReservationProps {
	price: number;
	dateRange: any;
	totalPrice: number;
	onChangeDate: (value: Range) => void;
	onSubmit: () => void;
	disabled?: boolean;
	disabledDates: Date[];
}

const ListingReservation = () => {
	return <div>Listing reservation</div>;
};

export default ListingReservation;
