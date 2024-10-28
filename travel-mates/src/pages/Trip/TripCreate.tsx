import MultiStepForm from '../../components/MultiStepForm/MultiStepForm';
import { FormProvider } from '../../context/FormContext';

const TripCreate = () => {
	return (
		<>
			<div className="container mx-auto p-4">
				<h1 className="text-2xl font-medium mb-12 text-center font-title">Ajouter un trip</h1>
				<FormProvider>
					<MultiStepForm />
				</FormProvider>

			</div>
		</>
	);
};

export default TripCreate;
