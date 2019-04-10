class Translation {

    static classification(t, classification) {
        return classification && t('Classification.name.'+classification.name, classification.name);
    }

    static type(t, typeHolder) {
        console.log(typeHolder);
        return typeHolder && t('ResultsType.'+typeHolder.type, typeHolder.type);
    }
}

export default Translation;