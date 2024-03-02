import { Field, Focusable, ConfirmModal, PanelSection, PanelSectionRow, TextField, DropdownItem  } from "decky-frontend-lib"
import { VFC, Fragment, useState } from "react"
import { Shortcut, ControlType, GetControlType, LANG } from "../../lib/data-structures/Shortcut"

type EditModalProps = {
    closeModal: () => void,
    onConfirm?(shortcut:Shortcut): any,
    title?: string,
    shortcut: Shortcut,
}

export const EditModal: VFC<EditModalProps> = ({
    closeModal,
    onConfirm = () => {},
    shortcut,
    title = `${LANG.ITEM_UI_EDITING} ${shortcut.name}`,
}) => {
    const [selectedOption, setSelectedOption] = useState<number | null>(shortcut.type == ControlType.TOGGLE ? 2 : shortcut.type == ControlType.SLIDER ? 3 : shortcut.type == ControlType.GROUP ? 4 : shortcut.type == ControlType.CHOICE ? 5 : 1);
    const [name, setName] = useState<string>(shortcut.name);
	const [desc, setDesc] = useState<string>(shortcut.desc);
	const [group, setGroup] = useState<string>(shortcut.group);
	const [timeout, setTimeout] = useState<string>(shortcut.timeout);
	const [current, setCurrent] = useState<string>(shortcut.current);
    const [cmd, setCmd] = useState<string>(shortcut.cmd);
	const [name1, setName1] = useState<string>(shortcut.name1);
	const [cmd1, setCmd1] = useState<string>(shortcut.cmd1);
	const [name2, setName2] = useState<string>(shortcut.name2);
	const [cmd2, setCmd2] = useState<string>(shortcut.cmd2);
	const [name3, setName3] = useState<string>(shortcut.name3);
	const [cmd3, setCmd3] = useState<string>(shortcut.cmd3);
	const [name4, setName4] = useState<string>(shortcut.name4);
	const [cmd4, setCmd4] = useState<string>(shortcut.cmd4);
	const [name5, setName5] = useState<string>(shortcut.name5);
	const [cmd5, setCmd5] = useState<string>(shortcut.cmd5);
	const [name6, setName6] = useState<string>(shortcut.name6);
	const [cmd6, setCmd6] = useState<string>(shortcut.cmd6);
	const [minValue, setMinValue] = useState<string>(String(shortcut.min));
	const [maxValue, setMaxValue] = useState<string>(String(shortcut.max));
	const [stepValue, setStepValue] = useState<string>(String(shortcut.step));
	const [scaleValue, setScaleValue] = useState<string>(String(shortcut.scale));
	const [suffix, setSuffix] = useState<string>(shortcut.suffix);
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

	let type = GetControlType(selectedOption);
    return (
        <>
            <ConfirmModal
				bAllowFullSize
				onCancel={closeModal}
				onEscKeypress={closeModal}
				onOK={() => {
					let updated = new Shortcut(shortcut.id, name, cmd, shortcut.position);

					// common
					updated.type = GetControlType(selectedOption);
					updated.desc = desc;
					updated.group = group;
					updated.timeout = timeout;
					updated.current = current;
			
					// button
					updated.name1 = name1;
					updated.cmd1 = cmd1;
					updated.name2 = name2;
					updated.cmd2 = cmd2;
					updated.name3 = name3;
					updated.cmd3 = cmd3;
					updated.name4 = name4;
					updated.cmd4 = cmd4;
					updated.name5 = name5;
					updated.cmd5 = cmd5;
					updated.name6 = name6;
					updated.cmd6 = cmd6;
			
					// toggle
					updated.checked = shortcut.checked;
			
					// slider
					updated.min = minValue;
					updated.max = maxValue;
					updated.step =stepValue;
					updated.scale = scaleValue;
					updated.value = shortcut.value;
					updated.suffix = suffix;
			
					onConfirm(updated);
			
					closeModal();
				}}>
                <PanelSection title = {title}>
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
                </PanelSection>
            </ConfirmModal>
        </>
    )
}
