import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
	Card,
	CardHeader,
	Typography,
	Button,
	CardBody,
	Chip,
	CardFooter,
	IconButton,
	Tooltip,
	Input,
} from '@material-tailwind/react';
import UpdateEmpDetailsBox from './UpdateEmpDetailsBox';
import { TrashIcon } from '@heroicons/react/24/solid';

const TABLE_HEAD = [
	'Emp Id / Full Name',
	'Location',
	'Company',
	'Department',
	'Salary',
	'Joining Date',
	'Status',
	'Edit/Delete',
];

const TABLE_ROWS = [
	{
		employeeID: '001',
		fullName: 'Rahul Kumar Soni',
		location: 'Bhopal',
		companyName: 'Google IT',
		salary: '250000',
		departmentName: 'IT',
		joiningDate: '06/2026',
		status: 'Active',
	},
	{
		employeeID: '002',
		fullName: 'John Doe',
		location: 'New York',
		companyName: 'Amazon',
		salary: '150000',
		departmentName: 'Marketing',
		joiningDate: '08/2021',
		status: 'Resign',
	},
	{
		employeeID: '003',
		fullName: 'Jane Smith',
		location: 'San Francisco',
		companyName: 'Facebook',
		salary: '200000',
		departmentName: 'HR',
		joiningDate: '03/2022',
		status: 'Active',
	},
	{
		employeeID: '004',
		fullName: 'Alice Johnson',
		location: 'Los Angeles',
		companyName: 'Microsoft',
		salary: '180000',
		departmentName: 'Finance',
		joiningDate: '01/2020',
		status: 'Active',
	},
	{
		employeeID: '005',
		fullName: 'Bob Brown',
		location: 'Chicago',
		companyName: 'IBM',
		salary: '160000',
		departmentName: 'IT',
		joiningDate: '09/2019',
		status: 'Active',
	},
	{
		employeeID: '006',
		fullName: 'Charlie Davis',
		location: 'Seattle',
		companyName: 'Google IT',
		salary: '220000',
		departmentName: 'Operations',
		joiningDate: '11/2018',
		status: 'Active',
	},
	{
		employeeID: '007',
		fullName: 'David Wilson',
		location: 'Boston',
		companyName: 'Apple',
		salary: '240000',
		departmentName: 'Engineering',
		joiningDate: '05/2023',
		status: 'Active',
	},
];

const ITEMS_PER_PAGE = 5;

export function Table() {
	const [currentPage, setCurrentPage] = useState(0);
	const [tableRows, setTableRows] = useState(TABLE_ROWS);

	useEffect(() => {
		setCurrentPage(0); // Reset page when tableRows changes
	}, [tableRows]);

	const start = currentPage * ITEMS_PER_PAGE;
	const end = start + ITEMS_PER_PAGE;
	const currentRows = tableRows.slice(start, end);

	const totalPages = Math.ceil(tableRows.length / ITEMS_PER_PAGE);

	const handlePrevious = () => {
		if (currentPage > 0) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNext = () => {
		if (currentPage < totalPages - 1) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handleDeleteClick = (employeeID) => {
		const updatedRows = tableRows.filter(
			(row) => row.employeeID !== employeeID,
		);
		setTableRows(updatedRows);
	};

	return (
		<Card className='h-full w-full bg-blue-gray-50'>
			<CardHeader
				floated={false}
				shadow={false}
				className='rounded-none bg-blue-gray-50 py-2'>
				<div className='flex flex-col justify-between gap-6 md:flex-row md:items-center'>
					<div>
						<Typography
							variant='h5'
							color='blue-gray'>
							Employees Details
						</Typography>
					</div>
					<div className='flex w-full shrink-0 gap-2 md:w-max'>
						<div className='w-full md:w-72'>
							<Input
								label='Search'
								icon={<MagnifyingGlassIcon className='h-5 w-5' />}
							/>
						</div>
					</div>
				</div>
			</CardHeader>
			<CardBody className='px-6'>
				<table className='w-full min-w-max table-auto text-left'>
					<thead>
						<tr>
							{TABLE_HEAD.map((head) => (
								<th
									key={head}
									className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-2'>
									<Typography
										variant='small'
										color='blue-gray'
										className='font-normal leading-none opacity-70'>
										{head}
									</Typography>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{currentRows.map(
							(
								{
									employeeID,
									fullName,
									location,
									companyName,
									salary,
									departmentName,
									joiningDate,
									status,
								},
								index,
							) => {
								const isLast = index === currentRows.length - 1;
								const classes = isLast
									? 'p-2'
									: 'p-2 border-b border-blue-gray-50';

								return (
									<tr key={employeeID}>
										<td className={classes}>
											<div className='flex items-center gap-3'>
												<Typography
													variant='small'
													color='blue-gray'
													className='font-bold'>
													{employeeID}
												</Typography>
												<Typography
													variant='small'
													color='blue-gray'
													className='font-bold'>
													{fullName}
												</Typography>
											</div>
										</td>
										<td className={classes}>
											<Typography
												variant='small'
												color='blue-gray'
												className='font-normal'>
												{location}
											</Typography>
										</td>
										<td className={classes}>
											<Typography
												variant='small'
												color='blue-gray'
												className='font-normal'>
												{companyName}
											</Typography>
										</td>
										<td className={classes}>
											<Typography
												variant='small'
												color='blue-gray'
												className='font-normal'>
												{departmentName}
											</Typography>
										</td>
										<td className={classes}>
											<Typography
												variant='small'
												color='blue-gray'
												className='font-normal'>
												{salary}
											</Typography>
										</td>
										<td className={classes}>
											<Typography
												variant='small'
												color='blue-gray'
												className='font-normal'>
												{joiningDate}
											</Typography>
										</td>
										<td className={classes}>
											<div className='w-max'>
												<Chip
													size='sm'
													variant='ghost'
													value={status}
													color={
														status === 'Active'
															? 'green'
															: status === 'Resign'
															? 'amber'
															: 'red'
													}
												/>
											</div>
										</td>
										<td className={classes}>
											<Tooltip content='Edit User'>
												<UpdateEmpDetailsBox
													user={{
														employeeID,
														fullName,
														location,
														companyName,
														salary,
														departmentName,
														joiningDate,
														status,
													}}
												/>
											</Tooltip>
											<Tooltip content='Delete User'>
												<IconButton
													variant='text'
													onClick={() => handleDeleteClick(employeeID)}>
													<TrashIcon className='h-4 w-4' />
												</IconButton>
											</Tooltip>
										</td>
									</tr>
								);
							},
						)}
					</tbody>
				</table>
			</CardBody>
			<CardFooter className='flex items-center justify-between border-t border-blue-gray-50 p-4'>
				<Button
					variant='outlined'
					size='sm'
					onClick={handlePrevious}
					disabled={currentPage === 0}>
					Previous
				</Button>
				<div className='flex items-center gap-2'>
					{Array.from({ length: totalPages }, (_, i) => (
						<IconButton
							key={i}
							variant={i === currentPage ? 'filled' : 'outlined'}
							size='sm'
							onClick={() => setCurrentPage(i)}>
							{i + 1}
						</IconButton>
					))}
				</div>
				<Button
					variant='outlined'
					size='sm'
					onClick={handleNext}
					disabled={currentPage === totalPages - 1}>
					Next
				</Button>
			</CardFooter>
		</Card>
	);
}
