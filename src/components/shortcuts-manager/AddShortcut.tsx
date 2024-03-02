import { Field, Focusable, PanelSection, PanelSectionRow, TextField, ButtonItem, DropdownItem, quickAccessControlsClasses } from "decky-frontend-lib"
import { Fragment, useState, useEffect } from "react"
import { PyInterop } from "../../PyInterop";
import { Shortcut, ControlType, GetControlType, LANG } from "../../lib/data-structures/Shortcut";

import {v4 as uuidv4} from "uuid";
import { useShortcutsState } from "../../state/ShortcutsState";

export function AddShortcut() {
	const {shortcuts, setShortcuts, shortcutsList} = useShortcutsState();
	const [ableToSave, setAbleToSave] = useState(false);
	const [selectedOption, setSelectedOption] = useState<number | null>(1);
	const [name, setName] = useState<string>("");
	const [desc, setDesc] = useState<string>("");
	const [group, setGroup] = useState<string>("");
	const [timeout, setTimeout] = useState<string>("1000");
	const [current, setCurrent] = useState<string>("");	
	const [cmd, setCmd] = useState<string>("");
	const [name1, setName1] = useState<string>("");
	const [cmd1, setCmd1] = useState<string>("");
	const [name2, setName2] = useState<string>("");
	const [cmd2, setCmd2] = useState<string>("");
	const [name3, setName3] = useState<string>("");
	const [cmd3, setCmd3] = useState<string>("");
	const [name4, setName4] = useState<string>("");
	const [cmd4, setCmd4] = useState<string>("");
	const [name5, setName5] = useState<string>("");
	const [cmd5, setCmd5] = useState<string>("");
	const [name6, setName6] = useState<string>("");
	const [cmd6, setCmd6] = useState<string>("");
	const [minValue, setMinValue] = useState<string>("1");
	const [maxValue, setMaxValue] = useState<string>("100");
	const [stepValue, setStepValue] = useState<string>("1");
	const [scaleValue, setScaleValue] = useState<string>("1");
	const [suffix, setSuffix] = useState<string>("");
	const options = [
		{
			data: 1,
			label: LANG.ITEM_TYPE_BUTTON,
		},
		{
			data: 2,
			label: LANG.ITEM_TYPE_TOGGLE,
		},
		{
			data: 3,
			label: LANG.ITEM_TYPE_SLIDER,
		},
		{
			data: 4,
			label: LANG.ITEM_TYPE_GROUP,
		},
		{
			data: 5,
			label: LANG.ITEM_TYPE_CHOICE,
		},
	];
	const [ITEM_UI_TYPE] = useState<string>(LANG.ITEM_UI_TYPE);
	const [ITEM_UI_SELECT] = useState<string>(LANG.ITEM_UI_SELECT);
	const [ITEM_UI_NAME] = useState<string>(LANG.ITEM_UI_NAME);
	const [ITEM_UI_DESC] = useState<string>(LANG.ITEM_UI_DESC);
	const [ITEM_UI_GROUP] = useState<string>(LANG.ITEM_UI_GROUP);
	const [ITEM_UI_CMD_ON] = useState<string>(LANG.ITEM_UI_CMD_ON);
	const [ITEM_UI_CMD_OFF] = useState<string>(LANG.ITEM_UI_CMD_OFF);
	const [ITEM_UI_MIN] = useState<string>(LANG.ITEM_UI_MIN);
	const [ITEM_UI_MAX] = useState<string>(LANG.ITEM_UI_MAX);
	const [ITEM_UI_STEP] = useState<string>(LANG.ITEM_UI_STEP);
	const [ITEM_UI_SCALE] = useState<string>(LANG.ITEM_UI_SCALE);
	const [ITEM_UI_UNIT] = useState<string>(LANG.ITEM_UI_UNIT);
	const [ITEM_UI_VALUE] = useState<string>(LANG.ITEM_UI_VALUE);
	const [ITEM_UI_NAME1] = useState<string>(LANG.ITEM_UI_NAME1);
	const [ITEM_UI_CMD1] = useState<string>(LANG.ITEM_UI_CMD1);
	const [ITEM_UI_NAME2] = useState<string>(LANG.ITEM_UI_NAME2);
	const [ITEM_UI_CMD2] = useState<string>(LANG.ITEM_UI_CMD2);
	const [ITEM_UI_NAME3] = useState<string>(LANG.ITEM_UI_NAME3);
	const [ITEM_UI_CMD3] = useState<string>(LANG.ITEM_UI_CMD3);
	const [ITEM_UI_NAME4] = useState<string>(LANG.ITEM_UI_NAME4);
	const [ITEM_UI_CMD4] = useState<string>(LANG.ITEM_UI_CMD4);
	const [ITEM_UI_NAME5] = useState<string>(LANG.ITEM_UI_NAME5);
	const [ITEM_UI_CMD5] = useState<string>(LANG.ITEM_UI_CMD5);
	const [ITEM_UI_NAME6] = useState<string>(LANG.ITEM_UI_NAME6);
	const [ITEM_UI_CMD6] = useState<string>(LANG.ITEM_UI_CMD6);
	const [ITEM_UI_CMD] = useState<string>(LANG.ITEM_UI_CMD);
	const [ITEM_UI_DELAY] = useState<string>(LANG.ITEM_UI_DELAY);
	const [ITEM_UI_CURRENT] = useState<string>(LANG.ITEM_UI_CURRENT);	

	function saveShortcut() {
		let newShort = new Shortcut(uuidv4(), name, cmd, shortcutsList.length+1);

		// common
		newShort.type = GetControlType(selectedOption);
		newShort.desc = desc;
		newShort.group = group;
		newShort.timeout = timeout;
		newShort.current = current;

		// button
		newShort.name1 = name1;
		newShort.cmd1 = cmd1;
		newShort.name2 = name2;
		newShort.cmd2 = cmd2;
		newShort.name3 = name3;
		newShort.cmd3 = cmd3;
		newShort.name4 = name4;
		newShort.cmd4 = cmd4;
		newShort.name5 = name5;
		newShort.cmd5 = cmd5;
		newShort.name6 = name6;
		newShort.cmd6 = cmd6;

		// toggle
		newShort.checked = -1;

		// slider
		newShort.min = minValue;
		newShort.max = maxValue;
		newShort.step = stepValue;
		newShort.scale = scaleValue;
		newShort.value = "-1";
		newShort.suffix = suffix;

		setName("");
		setDesc("");
		setGroup("");
		setTimeout("");
		setCurrent("");		
		setCmd("");
		setName1("");
		setCmd1("");
		setName2("");
		setCmd2("");
		setMinValue("1");
		setMaxValue("100");
		setStepValue("1");
		setScaleValue("1");
		setSuffix("");
		PyInterop.toast(LANG.TOAST_SUCCESS, LANG.TOAST_SAVE);

		const ref = {...shortcuts};
		ref[newShort.id]= newShort;
		setShortcuts(ref, true);
	}

	useEffect(() => {
		let type = GetControlType(selectedOption);

		if (type == ControlType.BUTTON) setAbleToSave(name != "" && cmd != ""); // button
		else if (type == ControlType.TOGGLE) setAbleToSave(name != "" && cmd != "" && cmd1 != ""); // toggle
		else if (type == ControlType.SLIDER) setAbleToSave(name != "" && cmd != ""); // slider
		else if (type == ControlType.GROUP) setAbleToSave(name != "" && group != ""); // group
		else if (type == ControlType.CHOICE) setAbleToSave(name != "" && name1 != ""); // choice
		else setAbleToSave(false); // none
		
	}, [selectedOption, name, group, cmd, cmd1])

	let type = GetControlType(selectedOption);
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
							label = {ITEM_UI_TYPE}
							strDefaultLabel = {ITEM_UI_SELECT}
							selectedOption = {selectedOption}
							onChange = {(data) => {setSelectedOption(data.data)}}
						/>
					</PanelSectionRow>
                    <PanelSectionRow>
						<Field
							label = {ITEM_UI_NAME}
							description = {
								<TextField
									label = {''}
									value = {name}
									onChange = {(e) => {setName(e?.target.value)}}
								/>
							}
						/>
                    </PanelSectionRow>
					{type == ControlType.TOGGLE || type == ControlType.GROUP ? // Toggle group
						<PanelSectionRow>
							<Field
								label={ITEM_UI_DESC}
								description = {
									<TextField
										label = {''}
										value = {desc}
										onChange = {(e) => {setDesc(e?.target.value)}}
									/>
								}
							/>
						</PanelSectionRow>
                    : null }
					<PanelSectionRow>
						<Field
							label = {ITEM_UI_GROUP}
							description = {
								<TextField
									label = {''}
									value = {group}
									onChange = {(e) => {setGroup(e?.target.value)}}
								/>
							}
						/>
					</PanelSectionRow>
					{type == ControlType.TOGGLE || type == ControlType.GROUP ? // Toggle group
						<>
							<PanelSectionRow>
								<Field
									label = {ITEM_UI_CMD_OFF}
									description = {
										<TextField
											label = {''}
											value = {cmd}
											onChange = {(e) => {setCmd(e?.target.value)}}
										/>
									}
								/>
							</PanelSectionRow>
							<PanelSectionRow>
								<Field
									label = {ITEM_UI_CMD_ON}
									description = {
										<TextField
											label = {''}
											value = {cmd1}
											onChange = {(e) => {setCmd1(e?.target.value)}}
										/>
									}
								/>
							</PanelSectionRow>
						</>
					: type == ControlType.SLIDER ? // Slider
						<>
							<Focusable style = {{ display: 'flex', alignItems: 'center', gap: '1rem'}} flow-childen="horizontal" >
								<Focusable style = {{ width: '25%', minWidth: 0 }}>
									<Field
										label = {ITEM_UI_MIN}
										description = {
											<TextField
												mustBeNumeric = {true}
												label = {''}
												value = {minValue}
												onChange = {(e) => {setMinValue(e?.target.value)}}
											/>
										}
									/>
								</Focusable>
								<Focusable style = {{ width: '25%', minWidth: 0 }}>
									<Field
										label = {ITEM_UI_MAX}
										description = {
											<TextField
												mustBeNumeric = {true}
												label = {''}
												value = {maxValue}
												onChange = {(e) => {setMaxValue(e?.target.value)}}
											/>
										}
									/>
								</Focusable>
								<Focusable style = {{ width: '25%', minWidth: 0 }}>
									<Field
										label = {ITEM_UI_STEP}
										description = {
											<TextField
												mustBeNumeric = {true}
												label = {''}
												value = {stepValue}
												onChange = {(e) => {setStepValue(e?.target.value)}}
											/>
										}
									/>
								</Focusable>
								<Focusable style = {{ width: '25%', minWidth: 0 }}>
									<Field
										label = {ITEM_UI_SCALE}
										description = {
											<TextField
												mustBeNumeric = {true}
												label = {''}
												value = {scaleValue}
												onChange = {(e) => {setScaleValue(e?.target.value)}}
											/>
										}
									/>
								</Focusable>
							</Focusable>
							<PanelSectionRow>
								<Field
									label = {ITEM_UI_UNIT}
									description = {
										<TextField
											label = {''}
											value = {suffix}
											onChange = {(e) => {setSuffix(e?.target.value)}}
										/>
									}
								/>
							</PanelSectionRow>
							<PanelSectionRow>
								<Field
									label = {ITEM_UI_VALUE}
									description = {
										<TextField
											label = {''}
											value = {cmd}
											onChange = {(e) => {setCmd(e?.target.value)}}
										/>
									}
								/>
							</PanelSectionRow>
						</>
					: type == ControlType.CHOICE ? // Choice
						<>
							<Focusable style = {{ display: 'flex', alignItems: 'center', gap: '1rem'}} flow-childen="horizontal" >
								<Focusable style = {{ width: '30%', minWidth: 0 }}>
									<Field
										label = {ITEM_UI_NAME1}
										description = {
											<TextField
												label = {''}
												value = {name1}
												onChange = {(e) => {setName1(e?.target.value)}}
											/>
										}
									/>
								</Focusable>
								<Focusable style = {{ width: '70%', minWidth: 0 }}>
									<Field
										label = {ITEM_UI_CMD1}
										description = {
											<TextField
												label = {''}
												value = {cmd1}
												onChange = {(e) => {setCmd1(e?.target.value)}}
											/>
										}
									/>
								</Focusable>
							</Focusable>
							<Focusable style = {{ display: 'flex', alignItems: 'center', gap: '1rem'}} flow-childen="horizontal" >
								<Focusable style = {{ width: '30%', minWidth: 0 }}>
									<Field
										label = {ITEM_UI_NAME2}
										description = {
											<TextField
												label = {''}
												value = {name2}
												onChange = {(e) => {setName2(e?.target.value)}}
											/>
										}
									/>
								</Focusable>
								<Focusable style = {{ width: '70%', minWidth: 0 }}>
									<Field
										label = {ITEM_UI_CMD2}
										description = {
											<TextField
												label = {''}
												value = {cmd2}
												onChange = {(e) => {setCmd2(e?.target.value)}}
											/>
										}
									/>
								</Focusable>
							</Focusable>
							<Focusable style = {{ display: 'flex', alignItems: 'center', gap: '1rem'}} flow-childen="horizontal" >
								<Focusable style = {{ width: '30%', minWidth: 0 }}>
									<Field
										label = {ITEM_UI_NAME3}
										description = {
											<TextField
												label = {''}
												value = {name3}
												onChange = {(e) => {setName3(e?.target.value)}}
											/>
										}
									/>
								</Focusable>
								<Focusable style = {{ width: '70%', minWidth: 0 }}>
									<Field
										label = {ITEM_UI_CMD3}
										description = {
											<TextField
												label = {''}
												value = {cmd3}
												onChange = {(e) => {setCmd3(e?.target.value)}}
											/>
										}
									/>
								</Focusable>
							</Focusable>
							<Focusable style = {{ display: 'flex', alignItems: 'center', gap: '1rem'}} flow-childen="horizontal" >
								<Focusable style = {{ width: '30%', minWidth: 0 }}>
									<Field
										label = {ITEM_UI_NAME4}
										description = {
											<TextField
												label = {''}
												value = {name4}
												onChange = {(e) => {setName4(e?.target.value)}}
											/>
										}
									/>
								</Focusable>
								<Focusable style = {{ width: '70%', minWidth: 0 }}>
									<Field
										label = {ITEM_UI_CMD4}
										description = {
											<TextField
												label = {''}
												value = {cmd4}
												onChange = {(e) => {setCmd4(e?.target.value)}}
											/>
										}
									/>
								</Focusable>
							</Focusable>
							<Focusable style = {{ display: 'flex', alignItems: 'center', gap: '1rem'}} flow-childen="horizontal" >
								<Focusable style = {{ width: '30%', minWidth: 0 }}>
									<Field
										label = {ITEM_UI_NAME5}
										description = {
											<TextField
												label = {''}
												value = {name5}
												onChange = {(e) => {setName5(e?.target.value)}}
											/>
										}
									/>
								</Focusable>
								<Focusable style = {{ width: '70%', minWidth: 0 }}>
									<Field
										label = {ITEM_UI_CMD5}
										description = {
											<TextField
												label = {''}
												value = {cmd5}
												onChange = {(e) => {setCmd5(e?.target.value)}}
											/>
										}
									/>
								</Focusable>
							</Focusable>
							<Focusable style = {{ display: 'flex', alignItems: 'center', gap: '1rem'}} flow-childen="horizontal" >
								<Focusable style = {{ width: '30%', minWidth: 0 }}>
									<Field
										label = {ITEM_UI_NAME6}
										description = {
											<TextField
												label = {''}
												value = {name6}
												onChange = {(e) => {setName6(e?.target.value)}}
											/>
										}
									/>
								</Focusable>
								<Focusable style = {{ width: '70%', minWidth: 0 }}>
									<Field
										label = {ITEM_UI_CMD6}
										description = {
											<TextField
												label = {''}
												value = {cmd6}
												onChange = {(e) => {setCmd6(e?.target.value)}}
											/>
										}
									/>
								</Focusable>
							</Focusable>
						</>
					:
						<PanelSectionRow>
							<Field
								label = {ITEM_UI_CMD}
								description = {
									<TextField
										label = {''}
										value = {cmd}
										onChange = {(e) => {setCmd(e?.target.value)}}
									/>
								}
							/>
							<Focusable style = {{ display: 'flex', alignItems: 'center', gap: '1rem'}} flow-childen="horizontal" >
								<Focusable style = {{ width: '30%', minWidth: 0 }}>
									<Field
										label = {ITEM_UI_NAME2}
										description = {
											<TextField
												label = {''}
												value = {name1}
												onChange = {(e) => {setName1(e?.target.value)}}
											/>
										}
									/>
								</Focusable>
								<Focusable style = {{ width: '70%', minWidth: 0 }}>
									<Field
										label = {ITEM_UI_CMD2}
										description = {
											<TextField
												label = {''}
												value = {cmd1}
												onChange = {(e) => {setCmd1(e?.target.value)}}
											/>
										}
									/>
								</Focusable>
							</Focusable>
							<Focusable style = {{ display: 'flex', alignItems: 'center', gap: '1rem'}} flow-childen="horizontal" >
								<Focusable style = {{ width: '30%', minWidth: 0 }}>
									<Field
										label = {ITEM_UI_NAME3}
										description = {
											<TextField
												label = {''}
												value = {name2}
												onChange = {(e) => {setName2(e?.target.value)}}
											/>
										}
									/>
								</Focusable>
								<Focusable style = {{ width: '70%', minWidth: 0 }}>
									<Field
										label = {ITEM_UI_CMD3}
										description = {
											<TextField
												label = {''}
												value = {cmd2}
												onChange = {(e) => {setCmd2(e?.target.value)}}
											/>
										}
									/>
								</Focusable>
							</Focusable>
						</PanelSectionRow>
					}
					<Field
						label = {ITEM_UI_DELAY}
						description = {
							<TextField
								mustBeNumeric = {true}
								label = {''}
								value = {timeout}
								onChange = {(e) => {setTimeout(e?.target.value)}}
							/>
						}
					/>
					{type != ControlType.BUTTON ? // not Button
						<PanelSectionRow>
							<Field
								label = {ITEM_UI_CURRENT}
								description = {
									<TextField
										label = {''}
										value = {current}
										onChange = {(e) => {setCurrent(e?.target.value)}}
									/>
								}
							/>
						</PanelSectionRow>
                    : null }
					<PanelSectionRow>
						<ButtonItem layout = "below" onClick = {saveShortcut} disabled = {!ableToSave} bottomSeparator = 'none'>
							{LANG.ITEM_UI_SAVE}
						</ButtonItem>
					</PanelSectionRow>
				</PanelSection>
			</div>
		</>
	);
}
