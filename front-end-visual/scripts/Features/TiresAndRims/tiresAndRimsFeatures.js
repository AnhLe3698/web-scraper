class TiresAndRimsFeature extends Feature {
    constructor(name) {
      super(name);
    }
    
}

class IsBrand extends TiresAndRimsFeature{
    constructor() {
        super("IsBrand");
    }

    compute(ad, string){
        return (ad.title.toLowerCase().includes(string) || ad.description.toLowerCase().includes(string))
    }
}

