---
title: "Why your NES blinks, and how we fix it for good"
description: "The blinking red light is the most famous fault in retro gaming. Here's what causes it, what actually helps, and which home remedies make it worse."
icon: nes
date: 2026-10-04 12:00:00 -0400
---

You slide the cartridge in, push it down, hit power, and the red light starts flashing. The screen blinks grey, or shows a garbled title screen for a second before it resets. Almost every original front-loading NES does this eventually.

The good news is that it's one of the easiest faults in retro gaming to fix properly.

## What's actually going on

The front-loading NES (model NES-001) holds the cartridge in a **72-pin connector**. When you press the cartridge down, the connector's spring pins clamp onto the cartridge's edge contacts. After decades of use, two things go wrong:

- **The pins lose their tension.** They've been bent open and closed thousands of times, so they no longer grip the cartridge firmly.
- **The contacts get dirty or oxidized.** Both the connector pins and the cartridge's gold contacts collect grime, and some cartridges show green or black corrosion.

That bad contact matters because of the **10NES lockout chip**. Nintendo put an authentication chip in every console and every licensed cartridge. When you power on, the console's chip talks to the cartridge's chip. If it can't get a clean answer, it resets the console about once a second. That reset loop is the blinking light.

So the blink usually isn't a dead console. It's a console that can't hear the cartridge clearly.

## What helps (and what doesn't)

**Don't blow in the cartridge.** It feels like it works because reseating the cartridge sometimes lands the pins on a cleaner spot. But the moisture in your breath speeds up corrosion on the contacts, so every blow makes the next failure more likely.

**Do clean the cartridge contacts.** Use a cotton swab with 90% or stronger isopropyl alcohol, rub the contacts on both sides until the swab comes away clean, and let it dry fully before inserting. This alone fixes a surprising number of "broken" games.

**Be careful with home connector tricks.** You'll find guides for boiling the 72-pin connector or bending the pins back by hand. These can buy some time, but results vary and it's easy to end up with uneven pins that grip some cartridges and not others.

## How we fix it on the bench

Our standard NES blink repair looks like this:

1. **Replace the 72-pin connector** with a new one, so every pin grips evenly.
2. **Clean the cartridge slot and the board edge** where the connector seats.
3. **Test with a stack of cartridges**, including a few known-difficult ones, through several cold starts.

<div class="callout"><b>OPTIONAL</b>Some owners also ask us to disable the 10NES lockout chip. That's done by isolating one pin on the chip. It means the console stops checking cartridges altogether, which also lets it play games from other regions. It's fully reversible, and we'll talk it through with you first.</div>

## What about the top-loader?

The later top-loading NES (model NES-101) doesn't have this problem nearly as often. It uses a direct card-edge slot instead of the push-down connector, and Nintendo removed the lockout chip from it. If you own one and it won't boot, the cause is usually somewhere else, so send it to us for a diagnosis.

If your NES is blinking, clean your cartridges first. If it still blinks, a new connector will almost certainly sort it out, and diagnosis is always free.
