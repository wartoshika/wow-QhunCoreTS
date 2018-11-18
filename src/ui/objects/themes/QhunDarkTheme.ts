import { WindowTheme, ActionButtonTheme } from "./WindowTheme";

/**
 * the dark action button theme
 */
const QhunDarkThemeActionButton: ActionButtonTheme = {
    textColor: [.8, .8, .8],
    backgroundColor: [.235, .235, .235, 1],
    hoverBackgroundColor: [.314, .314, .314, 1]
};

/**
 * a mostly grey and dark grey based theme with relative high contrast
 */
export const QhunDarkTheme: WindowTheme = {

    backgroundColor: [.118, .118, .118, 1],
    textColor: [.655, .659, .663],
    titleBar: {
        titleTextColor: [.8, .8, .8],
        backgroundColor: [.235, .235, .235, 1],
        actionButtonTheme: QhunDarkThemeActionButton,
        closeActionButtonTheme: {
            textColor: QhunDarkThemeActionButton.textColor,
            backgroundColor: QhunDarkThemeActionButton.backgroundColor,
            hoverBackgroundColor: [.843, .082, .149, 1]
        }
    },
    actionButton: QhunDarkThemeActionButton
};
