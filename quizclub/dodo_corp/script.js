function showslide(activeSlideClass) {
  // show the active slide and hide the rest
  const elements = document.getElementsByClassName("slide");
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].classList.contains(activeSlideClass)) {
      elements[i].style.display = "block";
    } else {
      elements[i].style.display = "none";
    }
  }

  const nav = document.querySelector("nav ul");
  const ulElements = nav.getElementsByTagName("li");
  for (let i = 0; i < ulElements.length; i++) {
    if (ulElements[i].classList.contains(activeSlideClass)) {
      ulElements[i].classList.add("selected");
    } else {
      ulElements[i].classList.remove("selected");
    }
  }
}

// 🔊 THIS IS WHERE YOU PUT THE TEXT TO READ
const textToRead = `If you've ever been curious about how the universe really works under the hood, welcome to the fascinating world of quantum physics, where particles can be in two places at once, nothing is truly certain, and reality behaves in ways that seem almost magical. Don’t worry, you don’t need a PhD or a chalkboard full of equations to understand the basics. Let’s explore quantum physics the simple way, one strange idea at a time.

🔬 What Is Quantum Physics, Really? Quantum physics is the science that explains how tiny particles, like electrons, protons, photons, and atoms, behave. These are the building blocks of everything: your phone, your body, your coffee mug, even light and heat. While “classical physics” (like Newton’s laws) explains things like gravity, cars, or the moon’s motion, it breaks down when you zoom in really, really close. That’s where quantum physics takes over. Quantum physics also plays a foundational role in chemistry, explaining how atoms bond to form molecules. It helps us understand why metals conduct electricity and why some materials become superconductors at low temperatures.

📘 What Is Quantum Mechanics? Quantum mechanics is the branch of physics that describes the mathematical rules behind quantum physics. While 'quantum physics' is often used as a general term, quantum mechanics refers to the actual framework: the equations and principles that govern how particles behave. It tells us how to calculate probabilities, predict outcomes, and understand systems made of atoms and particles. The Schrödinger equation is a famous part of quantum mechanics. It’s like the Newton’s laws of the quantum world. Quantum mechanics underpins technologies like lasers, semiconductors, and even atomic clocks. It is used to predict chemical reactions, understand the behavior of materials, and is the reason quantum computers are possible.

🌊 Wave-Particle Duality: Are Particles Really Waves? Here’s one of the weirdest things in quantum physics: particles can act like waves. Think of a photon (a particle of light). You might imagine it as a tiny ball. But when scientists shine light through two narrow slits, it creates a pattern, as if it were a wave, not a bunch of particles. But then, if you watch which slit the photon goes through, it acts like a particle again. This dual behavior has been seen not just with photons, but with electrons, neutrons, and even entire atoms. It’s not just light that’s weird; everything at the quantum level behaves this way. 🤯 Observation changes reality. That’s not science fiction; it’s been shown again and again in experiments like the Double Slit Experiment.

🎲 The Uncertainty Principle: Built-In Fuzziness Proposed by Werner Heisenberg, the uncertainty principle says the more accurately you know a particle’s position, the less you know its speed, and vice versa. This isn’t about bad instruments; it’s a fundamental limit of nature. In the quantum world, things are inherently uncertain. This fuzziness also affects how atoms and electrons behave in atoms, leading to the idea of orbitals: regions where electrons are likely to be found rather than fixed paths.

🔗 Quantum Entanglement: Spooky Action at a Distance Two particles can become entangled, meaning their properties are linked. Change one, and the other changes instantly, even across galaxies. Einstein didn’t like this and called it “spooky action at a distance.” But experiments show it’s real. Entanglement is at the heart of quantum computing and even futuristic ideas like quantum teleportation. It is also central to quantum cryptography, a way to transmit information securely because any attempt to eavesdrop would break the entanglement and be detected.

🔥 Black Body Radiation: The Mystery That Started It All Here’s a fun historical detour. In the late 1800s, scientists tried to figure out how objects give off heat and light. They built perfect absorbers called black bodies, objects that absorb and emit all radiation. But their equations gave nonsense at high energies, suggesting infinite energy emission (called the ultraviolet catastrophe). Clearly wrong. Enter Max Planck, who suggested that energy is emitted in small packets, or quanta. This was the birth of quantum theory. His equation explained black body radiation perfectly, and this one idea (energy comes in tiny bits) changed physics forever.

🧠 Superposition: Two Things at Once Quantum particles can be in multiple states at once. That’s called superposition. Imagine you’re both asleep and awake at the same time. Sounds crazy? That’s exactly what quantum particles do. Only when you measure or observe them do they “collapse” into one state. Until then, they’re in a mix of possibilities. This leads to the famous thought experiment: Schrödinger’s Cat, a cat in a box that’s both alive and dead until you check.

🚪 Quantum Tunneling: Particles That Cheat Barriers Quantum tunneling is when a particle goes through a barrier that it shouldn’t be able to cross, as if it "tunnels" through it. Imagine rolling a ball up a hill that doesn’t have enough energy to reach the top. In classical physics, it would roll back. But in quantum mechanics, there’s a small chance the ball simply appears on the other side. This is not science fiction. Quantum tunneling is real and happens in things like nuclear fusion in the sun and in scanning tunneling microscopes used in nanotechnology. It’s another reminder that quantum particles do not obey classical rules.

🌫️ Quantum Decoherence: Why We Don’t See Superposition in Daily Life If particles can be in multiple states, why don’t we see superposition in big objects, like people or chairs? That’s because of quantum decoherence. When a quantum system interacts with the environment, like air molecules or light, it quickly loses its quantum behavior. It decoheres into one classical state. This explains why the quantum world looks so weird while our everyday world seems normal.

🌌 Quantum Gravity: The Big Missing Piece Quantum physics works great for tiny particles. General relativity works great for massive things like stars and planets. But the two don’t agree with each other. Scientists are working on theories like string theory and loop quantum gravity to merge them. If successful, we could understand black holes, the Big Bang, and maybe even build a unified theory of everything.

🌟 Virtual Particles: Ghosts of the Quantum World In the vacuum of space, particles constantly pop in and out of existence. These are called virtual particles. They are not directly observable, but their effects are real. For example, they explain how forces like electromagnetism work and even cause measurable effects like the Casimir effect, where two metal plates in a vacuum attract each other.

🧪 Why Does Any of This Matter? You’re probably wondering: "Okay, this is wild, but what’s the point?" Here’s how quantum physics touches your life every day: Smartphones and computers: Use semiconductors that rely on quantum behavior. Lasers: Work due to quantum energy levels. MRI machines: Based on quantum spin. GPS: Requires quantum-corrected clocks. Quantum computing (emerging): Will be thousands of times faster for some problems. Quantum cryptography: Enables ultra-secure communication by using entanglement and superposition.

🛸 Final Thoughts: Reality Is Stranger Than Fiction Quantum physics teaches us something humbling and beautiful. The universe is not what it seems. Underneath the world we see every day is a strange, probabilistic dance of particles and waves, full of mystery and wonder. The best part? We’re still just beginning to understand it. So the next time you hear “quantum,” don’t let it scare you. Let it spark your curiosity. Because even the weirdest ideas, like black body radiation, wave-particle duality, or quantum teleportation, are not just possible. They are how reality actually works. 🧠 Quantum Physics Dictionary

1. Atom The basic unit of matter. Everything around you is made of atoms.

2. Photon A tiny particle of light. It has energy but no mass.

3. Electron A negatively charged particle found in atoms. It helps form electricity and chemical bonds.

4. Proton A positively charged particle found in the nucleus of an atom. It defines the element.

5. Neutron A neutral particle in the nucleus of an atom. It has mass but no charge.

6. Quantum A small, specific amount of something—usually energy.

7. Quantum Mechanics The mathematical framework that explains how particles behave at the smallest scales.

8. Superposition When a particle is in multiple states at once (like being in two places or having two energies).

9. Entanglement A connection between particles so strong that changing one affects the other instantly, even if far apart.

10. Wave-Particle Duality Particles (like light or electrons) behave like both waves and particles depending on how you observe them.

11. Uncertainty Principle You can’t know both a particle’s exact position and speed at the same time. Nature has a built-in fuzziness.

12. Quantum State The complete description of a particle’s properties (like its energy, spin, etc.).

13. Measurement (Observation) In quantum physics, measuring something can actually change it. It "collapses" possibilities into one result.

14. Black Body An ideal object that absorbs all light and emits radiation perfectly. Scientists use it to study heat and energy.

15. Black Body Radiation The energy (like heat and light) that a black body gives off. This led to the discovery of quantum theory.

16. Ultraviolet Catastrophe A failed prediction from classical physics that said hot objects should release infinite energy—fixed by quantum ideas.

17. Planck’s Constant (h) A tiny number that shows how energy is “quantized.” It’s the heart of many quantum formulas.

18. Schrödinger’s Cat A thought experiment about a cat being both alive and dead until you look inside a box—used to explain superposition.

19. Quantum Tunneling A particle magically goes through a barrier, even if it shouldn’t have enough energy to do so.

20. Qubit A quantum bit used in quantum computing. Unlike regular bits (0 or 1), a qubit can be both at once (superposition).

21. Spin A quantum property that’s kind of like rotation—but not exactly. It’s important for how particles behave.

22. Quantum Leap (Jump) When an electron instantly jumps from one energy level to another without traveling through the space in between.

23. Quantum Field A field (like an invisible energy layer) that covers space. Particles are seen as vibrations in these fields.

24. Vacuum Fluctuations Temporary changes in energy that happen in empty space due to virtual particles appearing and disappearing.

25. Virtual Particles Short-lived particles that exist in quantum fields and affect forces, even though they can't be directly observed.

26. Decoherence The process by which quantum systems lose their weird behavior and start behaving classically when interacting with the environment.

27. Hilbert Space An abstract mathematical space where quantum states live. It's used to calculate probabilities.

28. Eigenstate A specific, measurable state of a quantum system, like a particular energy or spin value.

29. Observable A physical property that can be measured in a quantum system, such as position or momentum.

30. Quantum Gravity A theoretical framework that tries to combine quantum mechanics with general relativity.

31. Many-Worlds Interpretation A theory suggesting that all possible outcomes of quantum measurements happen in separate, branching universes.

32. Quantum Supercomputer A new kind of computer that uses qubits to perform calculations that are too complex for regular computers.

33. Pauli Exclusion Principle A rule saying that no two electrons can occupy the same quantum state at the same time.

34. Fermion A type of particle (like electrons or protons) that follows the Pauli Exclusion Principle.

35. Boson Particles that carry forces (like photons or gluons) and do not follow the Pauli Exclusion Principle.
`;
let isPlaying = false;
let utterance;
function onPlayBtnClick() {
  if (!isPlaying) {
    utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.onend = () => {
      isPlaying = false;
      playBtn.textContent = "▶";
    };
    speechSynthesis.speak(utterance);
    playBtn.textContent = "⏸";
    isPlaying = true;
  } else {
    speechSynthesis.cancel();
    playBtn.textContent = "▶";
    isPlaying = false;
  }
}
