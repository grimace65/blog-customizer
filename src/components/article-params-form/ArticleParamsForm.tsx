import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useState, useRef } from 'react';
import clsx from 'clsx';

import { Select } from 'src/ui/select';
import { OptionType, fontFamilyOptions, fontSizeOptions, fontColors, backgroundColors, contentWidthArr } from 'src/constants/articleProps';

import { RadioGroup } from 'src/ui/radio-group';

import { Separator } from 'src/ui/separator';

import { Text } from 'src/ui/text';

import { ArticleStateType, defaultArticleState } from 'src/constants/articleProps';

import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
    state: ArticleStateType;
    setState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ state, setState }: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [currentState, setCurrentState] = useState(state);
	const formRef = useRef<HTMLFormElement>(null);

	const handleApply = () => {
		setState(currentState);
		setIsMenuOpen(false);
	}

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleApply();
	};

	const handleReset = () => {
		setCurrentState(state);
		setState(defaultArticleState);
		setIsMenuOpen(false);
	}

	const openToggle = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	useOutsideClickClose({ isOpen: isMenuOpen, rootRef: formRef, onClose: () => setIsMenuOpen(false) })

	const fontOptions: OptionType[] = fontFamilyOptions;
	const handleFontChange = (selectedOption: OptionType) => {
        setCurrentState({
            ...currentState,
            fontFamilyOption: selectedOption
        });
    };

	const sizeOptions: OptionType[] = fontSizeOptions;
	const handleSizeChange = (selectedOption: OptionType) => {
        setCurrentState({
            ...currentState,
            fontSizeOption: selectedOption
        });
    };

	const fontColorOptions: OptionType[] = fontColors;
	const handleFontColorChange = (selectedOption: OptionType) => {
        setCurrentState({
            ...currentState,
            fontColor: selectedOption
        });
    };

	const colorOptions: OptionType[] = backgroundColors;
	const handleColorChange = (selectedOption: OptionType) => {
        setCurrentState({
            ...currentState,
            backgroundColor: selectedOption
        });
    };

	const widthOptions: OptionType[] = contentWidthArr;
	const handleWidthChange = (selectedOption: OptionType) => {
        setCurrentState({
            ...currentState,
            contentWidth: selectedOption
        });
    };

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={openToggle} />
			<aside className={clsx(
                styles.container, 
                { [styles.container_open]: isMenuOpen }
            )}>
				<form ref={formRef} className={styles.form} onSubmit={handleFormSubmit}>
					<Text as="div" size={31} weight={800} uppercase family="open-sans" children="задайте параметры"></Text>
					<Select title='шрифт' selected={currentState.fontFamilyOption} options={fontOptions} onChange={handleFontChange}></Select>
					<RadioGroup title='размер шрифта' name='размер шрифта' selected={currentState.fontSizeOption} options={sizeOptions} onChange={handleSizeChange}></RadioGroup>
					<Select title='цвет шрифта' selected={currentState.fontColor} options={fontColorOptions} onChange={handleFontColorChange}></Select>
					<Separator></Separator>
					<Select title='цвет фона' selected={currentState.backgroundColor} options={colorOptions} onChange={handleColorChange}></Select>
					<Select title='ширина контента' selected={currentState.contentWidth} options={widthOptions} onChange={handleWidthChange}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' onClick={handleReset} htmlType='reset' type='clear' />
						<Button title='Применить' onClick={handleApply} htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
