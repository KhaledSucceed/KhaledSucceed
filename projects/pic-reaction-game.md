# PIC16F877A Reaction Game — Embedded Systems

## Overview
A microcontroller-based reaction-time game implemented for the PIC16F877A and simulated in Proteus.

## Documented behavior
- 8 LEDs + 8 push buttons
- 10 valid reaction rounds
- Pseudorandom LED selection
- Per-round response timing
- Timeout handling for missed responses
- LCD output
- Final minimum, maximum, and average reaction times

## Core control flow

```text
start input
   ↓
choose LED
   ↓
wait for matching button / timeout
   ↓
record reaction time
   ↓
repeat for 10 valid rounds
   ↓
compute min / max / average
   ↓
display results on LCD
```

## Hardware / implementation notes from the project report
- PIC16F877A
- External crystal for timing accuracy
- LCD in 4-bit mode
- MCLR pulled up externally
- Power conditioning / capacitors included in the design
- 9 V source regulated to 5 V in the hardware design

## What this project demonstrates
- Embedded control logic
- GPIO input/output
- Timing and reaction measurement
- LCD interfacing
- Basic pseudorandom selection
- Aggregate metric computation on-device
