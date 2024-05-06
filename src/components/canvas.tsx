// from https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

//import React from 'react';
import { useRef, useEffect } from 'react';

export const Canvas = (props: any) => {
	const { draw, options, ...rest } = props;
    //const { context, ...moreConfig } = options;
    const canvasRef = useCanvas(draw);

    return <canvas ref = {canvasRef} {...rest}/>;
}

var canvasFan: any = null;

export const useCanvas = (draw: (ctx: any, count: number) => void) => {
	const canvasRef: any = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
    	const context = canvas!.getContext('2d');
    	let frameCount = 0;
    	let animationFrameId: number;

    	const render = () => {
      		frameCount++;
      		draw(context, frameCount);
      		animationFrameId = window.requestAnimationFrame(render);
    	}
    	render();

    	return () => {
      		window.cancelAnimationFrame(animationFrameId);
    	}
  	}, [draw]);

	  canvasFan = canvasRef;

  	return canvasRef;
}

import { useState } from "react";
import { PanelSection, PanelSectionRow, Field, ToggleField } from "decky-frontend-lib";
import { PyInterop } from '../PyInterop';
import { LANG } from "../lib/data-structures/Shortcut";

const POINT_SIZE = 13;
var periodicHook: any = null;

export function FanControl(valueType: FanValueTypeProps) {
	const [firstTime, setFirstTime] = useState<boolean>(true);	
	const [enabledGlobal, setEnableInternal] = useState<boolean>(false);
	const [interpolGlobal, setInterpolInternal] = useState<boolean>(true);
	const [curveGlobal, setCurveInternal] = useState<FanCurveItems>([]);
	const [temperatureGlobal, setTemperature] = useState<number>(0);
	const [fanRpmGlobal, setFanRpm] = useState<number>(0);
  
	function setEnable(enable: boolean) {
		setEnableInternal(enable);
		PyInterop.setCustomFanControl(enable);
	}
	function setInterpol(enable: boolean) {
		setInterpolInternal(enable);
		PyInterop.setLinearFanControl(enable);
  	}
  	function setCurve(items: FanCurveItems) {
		items.sort((n1: FanCurveItem, n2: FanCurveItem) => n1.x - n2.x);
		for (let i = 0; i < items.length; i++) {
			if (items[i].x < 0) items[i].x = 0;
			if (items[i].x > 1) items[i].x = 1;
			if (items[i].y < 0) items[i].y = 0;
			if (items[i].y > 1) items[i].y = 1;
		}
		setCurveInternal(items);
		PyInterop.setFanCurveItems(items);
	}
	function setEnableSafe(enable: boolean) {
		if (enable != null) {
			setEnableInternal(enable);
		}
	}
	function setInterpolSafe(enable: boolean) {
		if (enable != null) {
			setInterpolInternal(enable);
		}
  	}
	function setCurveSafe(items: FanCurveItems) {
		if (items != null && Array.isArray(items)) {
			setCurveInternal(items);
		}
  	}
  
	function onClickCanvas(e: any) {
		//PyInterop.logPrint("canvas click1 ");
		if (canvasFan == null)
		{ 
			//PyInterop.logPrint("is null ");
			return;
		}
		const rect = canvasFan.current.getBoundingClientRect();
		//PyInterop.logPrint("Target dimensions1 " + rect.width.toString() + "x" + rect.height.toString());
	  	//PyInterop.logPrint("canvas click2 " + e.clientX.toString() + ", " + e.clientY.toString());
	  	const realEvent: any = e.nativeEvent;
	  	//PyInterop.logPrint("Canvas click @ (" + realEvent.layerX.toString() + ", " + realEvent.layerY.toString() + ")");
	  	const target: any = e.currentTarget;
	  	//PyInterop.logPrint("Target dimensions " + target.width.toString() + "x" + target.height.toString());
	  	const clickX = realEvent.clientX - rect.left;
	  	const clickY = realEvent.clientY - rect.top;
	  	for (let i = 0; i < curveGlobal.length; i++) {
			const curvePoint = curveGlobal[i];
			const pointX = curvePoint.x * target.width;
			if (pointX + POINT_SIZE > clickX && pointX - POINT_SIZE < clickX) {
				const pointY = (1 - curvePoint.y) * target.height;
				//console.log("Clicked on point " + i.toString());
				if (pointY + 4 > clickY && pointY - 4 < clickY) curveGlobal.splice(i, 1);
				else { 
					curvePoint.y = 1 - (clickY / target.height);
					curveGlobal[i] = curvePoint;
				}
				setCurve([... curveGlobal]);
				return;
		  	}
	  	}
	  	//console.log("Adding new point");
		let xx = clickX / target.width;
		xx = parseInt((xx * 14).toFixed(0)) / 14.0;
		let yy = 1 - (clickY / target.height);
		//PyInterop.logPrint("x : " + xx.toString() + " y: " + yy.toString());
		curveGlobal.push({x: xx, y: yy});
		setCurve([... curveGlobal]);
	}
  
	function drawCanvas(ctx: any, frameCount: number): void {
	  	if (frameCount % 100 > 1) {
			return;
	  	}
	  	const width: number = ctx.canvas.width;
	  	const height: number = ctx.canvas.height;
	  	ctx.strokeStyle = "#1a9fff";
	  	ctx.fillStyle = "#1a9fff";
	  	ctx.lineWidth = 2;
	  	ctx.lineJoin = "round";
	  	//ctx.beginPath();
	  	ctx.clearRect(0, 0, width, height);
	  	/*ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
	  	ctx.moveTo(110, 75);
	  	ctx.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)
	  	ctx.moveTo(65, 65);
	  	ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
	  	ctx.moveTo(95, 65);
	  	ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye*/
	  	//ctx.beginPath();
	  	//ctx.moveTo(0, height);
  
	  	// graph helper lines
	  	ctx.beginPath();
	  	ctx.strokeStyle = "#093455";
	  	//ctx.fillStyle = "#093455";
	  	const totalLines = 6;
	  	const lineDistance = 1 / (totalLines + 1);
	  	for (let i = 1; i <= totalLines; i++) {
			ctx.moveTo(lineDistance * i * width, 0);
			ctx.lineTo(lineDistance * i * width, height);
			ctx.moveTo(0, lineDistance * i * height);
			ctx.lineTo(width, lineDistance * i * height);
	  	}
	  	ctx.stroke();
	  	//ctx.fill();
  
	  	ctx.beginPath();
	  	ctx.strokeStyle = "#1a9fff";
	  	ctx.fillStyle = "#1a9fff";
  
	  	// axis labels
	  	ctx.textAlign = "center";
	  	ctx.rotate(- Math.PI / 2);
	  	ctx.fillText("Fan RPM", - height / 2, 12); // Y axis is rotated 90 degrees
	  	ctx.rotate(Math.PI / 2);
	  	ctx.fillText("Temperature", width / 2, height - 4);
	  	// graph data labels
	  	ctx.textAlign = "start"; // default
	  	ctx.fillText("30", 2, height - 2);
	  	ctx.fillText("100%", 2, 9);
	  	ctx.textAlign = "right";
	  	ctx.fillText("100°C", width - 2, height - 2);
  
	  	ctx.moveTo(0, height);
	  	if (interpolGlobal) {
			//ctx.beginPath();
			for (let i = 0; i < curveGlobal.length; i++) {
		  		const canvasHeight = (1 - curveGlobal[i].y) * height;
		  		const canvasWidth = curveGlobal[i].x * width;
		  		ctx.lineTo(canvasWidth, canvasHeight);
		  		ctx.moveTo(canvasWidth, canvasHeight);
		  		ctx.arc(canvasWidth, canvasHeight, 8, 0, Math.PI * 2);
		  		ctx.moveTo(canvasWidth, canvasHeight);
			}
			ctx.lineTo(width, 0);
			//ctx.moveTo(width, 0);
	  	}
		else {
			//ctx.beginPath();
			for (let i = 0; i < curveGlobal.length - 1; i++) {
		  		const canvasHeight = (1 - curveGlobal[i].y) * height;
		  		const canvasWidth = curveGlobal[i].x * width;
		  		const canvasHeight2 = (1 - curveGlobal[i+1].y) * height;
		  		const canvasWidth2 = curveGlobal[i+1].x * width;
		  		//ctx.lineTo(canvasWidth, canvasHeight);
		  		ctx.moveTo(canvasWidth, canvasHeight);
		  		ctx.arc(canvasWidth, canvasHeight, 8, 0, Math.PI * 2);
		  		ctx.moveTo(canvasWidth, canvasHeight);
		  		ctx.lineTo(canvasWidth2, canvasHeight);
		  		ctx.moveTo(canvasWidth2, canvasHeight);
		  		ctx.lineTo(canvasWidth2, canvasHeight2);
			}
			if (curveGlobal.length > 0) {
		  		const i = curveGlobal.length - 1;
		  		const canvasHeight = (1 - curveGlobal[i].y) * height;
		  		const canvasWidth = curveGlobal[i].x * width;
		  		//ctx.lineTo(width, 0);
		  		ctx.moveTo(canvasWidth, canvasHeight);
		  		ctx.arc(canvasWidth, canvasHeight, 8, 0, Math.PI * 2);
		  		ctx.moveTo(canvasWidth, canvasHeight);
		  		ctx.lineTo(width, canvasHeight);
		  		//ctx.moveTo(width, canvasHeight);
		  		//ctx.lineTo(width, 0);
		  		const canvasHeight2 = (1 - curveGlobal[0].y) * height;
		  		const canvasWidth2 = curveGlobal[0].x * width;
		  		ctx.moveTo(canvasWidth2, canvasHeight2);
		  		ctx.lineTo(canvasWidth2, height);
			}
			//ctx.moveTo(width, 0);
	  	}
	  	ctx.stroke();
	  	ctx.fill();
	  	//console.debug("Rendered fan graph canvas frame", frameCount);
	  	//console.debug("Drew canvas with " + curveGlobal.length.toString() + " points; " + width.toString() + "x" + height.toString());
	  	//ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	  	//ctx.fillStyle = '#000000';
	  	//ctx.beginPath();
	  	//ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI);
	  	//ctx.fill();  
	}
  
	if (firstTime) {
	  	setFirstTime(false);
		PyInterop.getCustomFanControl().then(res => {
			if (res.success) {
				try {
					setEnableSafe(res.result as boolean);
				}
				catch (e) {
				}
			}
		});
		PyInterop.getLinearFanControl().then(res => {
			if (res.success) {
				try {				
					setInterpolSafe(res.result as boolean);
            	}
				catch (e) {
				}
			}
		});
		PyInterop.getFanCurveItems().then(res => {
			if (res.success) {
				try {				
					setCurveSafe(res.result as FanCurveItems);
				}
				catch (e) {
				}
			}
		});

	  	if (periodicHook != null) {
			clearInterval(periodicHook);
	  	}
	  	periodicHook = setInterval(function() {
			PyInterop.getCpuTemp().then(res => {
				if (res.success) setTemperature(res.result as number);
				else setTemperature(0);
			});		
			PyInterop.getFanValue().then(res => {
				if (res.success) setFanRpm(res.result as number);
				else setFanRpm(0);
			});		
	  	}, 1000);
	}

	let fanUnit: string = valueType.type == 2 ? " %" : " RPM";
 
	// TODO handle clicking on fan curve nodes
  
	return (
	  	<PanelSection>
			{ valueType.type > 0 &&
				<PanelSectionRow>
					<Field
						label = {LANG.FAN_SPEED}>
						{fanRpmGlobal.toFixed(0) + fanUnit}
					</Field>
				</PanelSectionRow>
			}
			<PanelSectionRow>
				<Field
					label = {LANG.FAN_TEMPER}>
					{temperatureGlobal.toFixed(1) + " °C"}
				</Field>
			</PanelSectionRow>
			<PanelSectionRow>
				<ToggleField
					label = {LANG.FAN_CURVE}
					description = {LANG.FAN_CURVE_DESC}
					checked = {enabledGlobal}
					onChange = {(value: boolean) => {
						setEnable(value);
					}}
				/>
			</PanelSectionRow>
			{ enabledGlobal &&
				<PanelSectionRow>
					<Canvas draw = {drawCanvas} width = {250} height = {220} style = {{
						"width": "250px",
						"height": "220px",
						"padding":"0px",
						"border":"1px solid #1a9fff",
						//"position":"relative",
						"background-color":"#1a1f2c",
						"border-radius":"4px",
						//"margin":"auto",
					}} onClick = {(e: any) => onClickCanvas(e)}/>
				</PanelSectionRow>
			}
			{ enabledGlobal &&
				<PanelSectionRow>
					<ToggleField
						label = {LANG.FAN_LINEAR}
						description = {LANG.FAN_LINEAR_DESC}
						checked = {interpolGlobal}
						onChange = {(value: boolean) => {
							setInterpol(value);
						}}
					/>
				</PanelSectionRow>
			}
		</PanelSection>
	);
}
