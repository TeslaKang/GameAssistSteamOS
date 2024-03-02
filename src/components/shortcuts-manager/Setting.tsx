import { PanelSection, PanelSectionRow, DropdownItem, quickAccessControlsClasses } from "decky-frontend-lib"
import { Fragment, useState  } from "react"
import { PyInterop } from "../../PyInterop";
import { LANG } from "../../lib/data-structures/Shortcut";
import { useShortcutsState } from "../../state/ShortcutsState";

export function Setting(props: ShortcutSettingProps) {
	const { updateAll } = useShortcutsState();
	const [selectedOption, setSelectOption] = useState<number | null>(1);
	const options = [
		{
			data: 1,
			label: LANG.SETTING_LANG_AUTO,
		},
		{
			data: 2,
			label: "한국어",
		},
		{
			data: 3,
			label: "English",
		},
	];

    PyInterop.getLocale().then(res => {
        if (res.success) {
			let loc = res.result as string;

			if (loc.indexOf("ko") >= 0 || loc.indexOf("KR") >= 0) setSelectOption(2);
			else if (loc.indexOf("en") >= 0 || loc.indexOf("US") >= 0) setSelectOption(3);
        }
    });

	function setLanguage(num: Number) {
		let Lang = "";
		if (num == 1) Lang = "";
		else if (num == 2) Lang = "ko_KR";
		else if (num == 3) Lang = "en_US";
		PyInterop.setLocale(Lang);
		LANG.setLocale(Lang);
		props.onChange();
		updateAll();
	}

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
						<DropdownItem
							rgOptions = {options}
							label = "Language"
							strDefaultLabel = "Select language"
							selectedOption = {selectedOption}
							onChange = {(data) => {setLanguage(data.data)}}
						/>
					</PanelSectionRow>
				</PanelSection>
			</div>
		</>
	);
}
