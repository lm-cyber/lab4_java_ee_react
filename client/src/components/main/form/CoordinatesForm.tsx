import React from "react";
import {useForm} from "react-hook-form";
import {hitAPI} from "../../../api/hitsService";
import {setR} from "../../../store/reducers/FormCoordinatesSlice";
import {useAppDispatch} from "../../../hooks/redux";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";

import TabTrap from "@jetbrains/ring-ui/dist/tab-trap/tab-trap";

import ValidatedInput from "../common/ValidatedInput";
import CustomButton from "../../common/CustomButton";

import 'rc-slider/assets/index.css';
import "@jetbrains/ring-ui/dist/style.css";

type FormValues = {
    x: number;
    y: number;
    r: number;
};

const formSchema = yup.object({
    x: yup.number().moreThan(-5).lessThan(5).required(),
    y: yup.number().moreThan(-5).lessThan(3).required(),
    r: yup.number().moreThan(0).lessThan(5).required(),
}).required();

const CoordinatesForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormValues>({resolver: yupResolver(formSchema)});
    const [createHit, {}] = hitAPI.useCreateHitMutation({fixedCacheKey: 'shared-create-hit'});
    const [deleteHits, {}] = hitAPI.useDeleteAllHitsMutation();
    const dispatch = useAppDispatch();

    const onSubmit = handleSubmit((data: FormValues) => {
        onUpdateR(data.r);
        createHit({x: data.x, y: data.y, r: data.r, time: (new Date).toLocaleString()})
    });

    const onReset = () => deleteHits();

    const onUpdateR = (newRadius: number) => dispatch(setR(newRadius));

    return (
        <section className="grid-section input-section">
            <TabTrap>
                <form id="input-form">
                    <ValidatedInput label="X" error={errors.x}>
                        <input maxLength={3} className={`ring-input ${errors.y && "ring-input_error"} ring-input-size_m`}
                               {...register("x", {required: true, min: -4.9, max: 4.9})}/>
                    </ValidatedInput>

                    <ValidatedInput label="Y" error={errors.y}>
                        <input maxLength={3} className={`ring-input ${errors.y && "ring-input_error"} ring-input-size_m`}
                               {...register("y", {required: true, min: -4.9, max: 2.9})}/>
                    </ValidatedInput>

                    <ValidatedInput label="R" error={errors.r}>
                        <input maxLength={3} className={`ring-input ${errors.r && "ring-input_error"} ring-input-size_m`}
                               {...register("r", {
                                   required: true,
                                   min: 0.1,
                                   max: 5,
                               })}/>
                    </ValidatedInput>

                    <div className="input-container">
                        <CustomButton onClick={onSubmit} label="Add"/>
                        <CustomButton onClick={onReset} label="Reset"/>
                    </div>
                </form>
            </TabTrap>
        </section>
    )
}

export default CoordinatesForm;