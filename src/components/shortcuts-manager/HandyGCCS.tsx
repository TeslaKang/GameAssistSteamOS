import { PanelSection, PanelSectionRow, DropdownItem, quickAccessControlsClasses } from "decky-frontend-lib"
import { Fragment, useState  } from "react"
import { PyInterop } from "../../PyInterop";

export function HandyGCCS() {
	let buttonCommands: string[] = [ "ALT_TAB", "ESC", "KILL", "MODE", "OPEN_CHIMERA", "OSK", "OSK_DE", "OSK_NES", 
		"QAM", "QAM_NES", "SCR", "TOGGLE_PERFORMANCE", "TOGGLE_MOUSE", "TOGGLE_GYRO" ];
	const buttonOptions = [
		{
			data: 0,
			label: "ALT + TAB",
		},
		{
			data: 1,
			label: "ESC",
		},
		{
			data: 2,
			label: "KILL",
		},
		{
			data: 3,
			label: "MODE",
		},
		{
			data: 4,
			label: "Open Chimera",
		},
		{
			data: 5,
			label: "OSK(On Screen Keyboard)",
		},
		{
			data: 6,
			label: "OSK_DE",
		},
		{
			data: 7,
			label: "OSK_NES",
		},
		{
			data: 8,
			label: "QAM(Quick Access Menu)",
		},
		{
			data: 9,
			label: "QAM_NES",
		},
		{
			data: 10,
			label: "SCR(Screen Capture)",
		},
		{
			data: 11,
			label: "Toggle Performance",
		},
		{
			data: 12,
			label: "Toggle Mouse(currently don't work)",
		},
		{
			data: 13,
			label: "Toggle Gyro(currently don't work)",
		},
	];
	const [buttonState, setButtonState] = useState<number[]>([]);
	if (buttonState.length == 0) {
		for (let i = 0; i < 9; i++) {
			PyInterop.getHandyGCCS("button" + (i + 1).toString()).then(res => {
				if (res.success) {
					let cmd = res.result as string;
					let idx = buttonCommands.indexOf(cmd);

					buttonState.push(idx);
					setButtonState([... buttonState]);
				}
			});
		}
	}

	function setButton(idx: number, num: number) {
		PyInterop.setHandyGCCS("button" + (idx + 1).toString(), buttonCommands[num]);
	}

	const dropdownButton = buttonState?.map((_value: number, index: number) => ( 
		<DropdownItem
			rgOptions = {buttonOptions}
			label = {"Button " + (index + 1).toString()}
			strDefaultLabel = "Select Action"
			selectedOption = {buttonState[index]}
			onChange = {(data) => {setButton(index, data.data)}}
		/>
	));

	let powerCommands: string[] = [ "HIBERNATE", "SHUTDOWN", "SUSPEND", "SUSPEND_THEN_HIBERNATE" ];
	const powerOptions = [
		{
			data: 0,
			label: "Hibernate",
		},
		{
			data: 1,
			label: "Shutdown",
		},
		{
			data: 2,
			label: "Suspend",
		},
		{
			data: 3,
			label: "Suspend then hibernate",
		},
	];
	const [powerState, setPowerState] = useState<number[]>([]);
	const powerKey: string[] = [ "power_button", "lid_switch" ];
	const powerLabel: string[] = [ "Power Button", "LID Switch" ];

	if (buttonState.length == 0) { // for fix sync problem
		for (let i = 0; i < 2; i++) {
			PyInterop.getHandyGCCS(powerKey[i]).then(res => {
				if (res.success) {
					let cmd = res.result as string;
					let idx = powerCommands.indexOf(cmd);

					powerState.push(idx);
					setPowerState([... powerState]);
				}
			});
		}
	}

	function setPower(idx: number, num: number) {
		PyInterop.setHandyGCCS(powerKey[idx], powerCommands[num]);
	}

	const dropdownPower = powerState?.map((_value: number, index: number) => ( 
		<DropdownItem
			rgOptions = {powerOptions}
			label = {powerLabel[index]}
			strDefaultLabel = "Select Action"
			selectedOption = {powerState[index]}
			onChange = {(data) => {setPower(index, data.data)}}
		/>
	));

	return (
		<>
			<style>{`
				.scoper .${quickAccessControlsClasses.PanelSection} {
					width: inherit;
					height: inherit;
					padding: 0px;
				}
			`}</style>
			<div className="scoper">
				<PanelSection>
					<PanelSectionRow>
						{dropdownButton}
					</PanelSectionRow>
				</PanelSection>
				<PanelSection>
					<PanelSectionRow>
						{dropdownPower}
					</PanelSectionRow>
				</PanelSection>
			</div>
		</>
	);
}
