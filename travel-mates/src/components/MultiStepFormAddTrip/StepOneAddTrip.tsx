import { useState } from 'react';
import { Field, ErrorMessage, useFormikContext } from 'formik';
import SearchIcon from '../../assets/Icons/search.svg';
import CalendarIcon from '../../assets/Icons/datepicker.svg';
import { Typography } from '@material-tailwind/react';
import DatePickerComponent from '../DatePicker.tsx/DatePicker';
import { FormValues } from '../../interfaces/FormInterfaces/FormInterfaces';

const StepOne = () => {
    const [showCalendar, setShowCalendar] = useState(false);
    const { values, setFieldValue } = useFormikContext<FormValues>();

    return (
        <section className='md:mt-32 mt-8'>
            <Typography variant='h1' className='font-title text-2xl font-bold mb-12 text-center'>
                Ajouter un Trip
            </Typography>
            <div className="m-4">
                <Typography className="block text-black font-bold mb-1">
                    Quel est votre destination ?
                </Typography>
                <div className="relative">
                    <img
                        src={SearchIcon}
                        alt="search"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                    />
                    <Field
                        id="destination"
                        name="destination"
                        placeholder="Où allez-vous ?"
                        className="w-full pl-10 p-2 border border-gray-300 rounded"
                    />
                    <ErrorMessage
                        name="destination"
                        component="div"
                        className="text-red-500"
                    />
                </div>
            </div>
            <div className="m-4 relative">
                <Typography className="block text-black font-bold mb-1">
                    Dates
                </Typography>
                <div className="relative">
                    <img
                        src={CalendarIcon}
                        alt="calendar"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                    />
                    <Field
                        id="dates"
                        name="dates"
                        value={values.dates}
                        placeholder="Ajouter des dates"
                        className="border border-gray-300 p-2 rounded w-full pl-10 cursor-pointer"
                        onClick={() => setShowCalendar(!showCalendar)}
                        readOnly
                    />
                    <ErrorMessage name="dates" component="div" className="text-red-500" />
                </div>

                {showCalendar && (
                    <div className="mb-4">
                        <DatePickerComponent
                            onDateSelect={dates => {
                                setFieldValue('dates', dates);
                                const [startDate, endDate] = dates.split(' - ');
                                if (startDate !== endDate) {
                                    setShowCalendar(false);
                                }
                            }}
                            onClearDates={() => setFieldValue('dates', '')}
                        />
                    </div>
                )}
            </div>
        </section>
    );
};

export default StepOne;