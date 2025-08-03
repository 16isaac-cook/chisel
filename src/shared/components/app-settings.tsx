import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { ThemedRemixIcon } from "./themed-remixicon";

export function AppSettings() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="ghost" size="icon">
					<ThemedRemixIcon icon="Settings3" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Settings</DialogTitle>
					<DialogDescription className="sr-only">
						The settings window for the Chisel app
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
