    sCount is a (local) :WritableSignal produced by =signal(0)
    sCount value can be read via sCount()
    sCount value can be changed via sCount.set(10) or .update(count => count-1)
    --------------
    sSquare is a (local) read-only :Signal produced by 
    =computed(() => this.sCount() * this.sCount())
    NB: sQuare value will be lazily computed when first need/display sQuare()
    this computed_value will be automaticaly stored in cache
    the recomputation will be only fired when sCount value will be changed
    --------------
    effect( () => { console.log("..." + this.sCount()); })
    can fire "any_code_execution" (at least one_time) and at each change of 
    sCount (dependant signal)
    NB: effect() can be used as a value of component attribute or in a constructor