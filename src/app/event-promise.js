const event = (target, type) =>
	new Promise((resolve, _) =>
		target.on(type, r => resolve(r)))

export default event
