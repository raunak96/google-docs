import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import Input from "@material-tailwind/react/Input";

const ConfirmModal = ({
	isOpen = false,
	onClose,
	onSubmit,
	title = "Create a New Doc",
	body,
	inputValue,
	setInputValue,
	buttonText = "Create",
	isWarning = false,
}) => {
	return (
		<Modal size="regular" active={isOpen} toggler={onClose}>
			<ModalHeader toggler={onClose}>{title}</ModalHeader>
			<ModalBody>
				<p className="text-base leading-relaxed text-gray-600 font-normal mb-3">
					{body}
				</p>
				{setInputValue && (
					<Input
						type="text"
						color="blue"
						size="regular"
						outline={true}
						placeholder="File name"
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
						onKeyDown={e => e.key === "Enter" && onSubmit()}
					/>
				)}
			</ModalBody>
			<ModalFooter>
				<Button
					color={isWarning ? "red" : "blue"}
					buttonType="link"
					onClick={onClose}
					size="lg"
					ripple="dark">
					Cancel
				</Button>

				<Button
					color={isWarning ? "red" : "blue"}
					onClick={onSubmit}
					ripple="light"
					size="lg"
					disabled={inputValue && inputValue.trim() === ""}
					rounded={false}
					className="disabled:cursor-not-allowed disabled:opacity-50">
					{buttonText}
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default ConfirmModal;
