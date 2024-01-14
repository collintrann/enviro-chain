%lang starknet

@storage_var
func emissions_data() -> (value: felt):
end

@storage_var
func emissions_threshold() -> (value: felt):
end

@external
func set_emissions_data(new_emissions: felt):
    emissions_data.write(new_emissions)
    return ()
end

@external
func set_emissions_threshold(new_threshold: felt):
    emissions_threshold.write(new_threshold)
    return ()
end

@view
func is_emissions_within_threshold() -> (is_within_threshold: felt):
    let (emissions) = emissions_data.read()
    let (threshold) = emissions_threshold.read()
    return (is_within_threshold=emissions <= threshold)
end
